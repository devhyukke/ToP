# Note
https://typescript-jp.gitbook.io/deep-dive/ TypeScript Deep Drive 日本語版

##  実行環境を設定

1. `npm install -g typescript@next` TypeScript インストール
    * `tsc --version` バージョン確認
1. `npm init -y` package.json セットアップ
1. `npm install typescript --save-dev` Modules TypeScript 追加
    * TypeScript コンパイラ
1. `npm install @types/node --save-dev` Modules node.d.ts 追加
1. `npx tsc --init --rootDir src --outDir dest --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs` 指定した設定で tsconfig.json 初期化
    * TypeScript 設定ファイル 
1. `npm install ts-node --save-dev` Modules ts-node 追加
    * TypeScript コンパイル＋実行が可能な CLI ツール
    * `node_modules/.bin/ts-node src/assets/js/index.ts` インストールせず Modules から直接実行
1. `npm install nodemon --save-dev` Modules nodemon 追加
    * Watch するファイルの変更を検知する CLI ツール
1. 以下を package.json に追加
    ```
    "scripts": {
      "start": "npm run build:live",
      "build": "tsc -p .",
      "build:live": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/assets/js/index.ts"
    },
    ```
1. .gitignore ファイルを作成

## スクリプトを実行
package.json 参照 

* `npm run build` tsconfig.json `outDir` で指定したディレクトリにコンパイル済み JavaScript を作成
* `npm run start` nodemon で監視しつつ ts-node でコンパイル＋実行
    * `ctrl` + `c` 実行を終了

## 要点まとめ

### 目的
* 明示的に型を記述した方がメリットはあるが、書かなくても初期値から解釈される（暗黙的な型推論）
* 静的な型付けであれば儀式的になってしまうが、TypeScriptでは厳密な構文ルールに従わなくともよい
* 構文にエラーがあってもJSは出力されるため、段階的にTypeScriptに移行可能
* 型宣言でJSを安全かつ簡単に利用でき、それにかける労力が調整可能

### JavaScript
TypeScriptは、JavaScriptを良いドキュメントにする方法を標準化したようなものであるため、JavaScriptの理解が重要。

1. 等価性を意識する必要がある
    * 曖昧な等価 `==` 厳密な等価 `===` を使い分けないといけない
    * 構造の等価は `==` `===` で判定できない
1. すべてのオブジェクトは参照渡しであるため、そのオブジェクトに対する変更が影響し、参照に対して比較が行われる
1. ボトム型 `null` `undefined` を両方 `== null` などでチェックしなければいけない
    * ルートレベルのオブジェクトであれば `typeof someglobal !== 'undefined'` のようにする必要がある
    * 明示的な `undefined` の利用を制限すべき
    * コールバック関数の場合に `error` が `null` であるケースを加味しなければならない
    * 有効性の目的で `undefined` を利用すべきでない
    * JSONにシリアライズする場合は `null` は含まれるが `undefined` は除外されてしまう
1. `this` は関数がどのように呼び出されたか、呼び出しコンテキストによって制御されてしまうため注意が必要
1. クロージャが使用可能
1. 数値の扱いに注意が必要
    * たった１つの数値型 `number` しかない
    * バイナリ浮動小数が10進数の小数を正しく扱えない
        * 例: `.1 + .2` → `0.30000000000000004`
    * 整数の限界値に対してその安全性を `Number.isSafeInteger` でチェックする
    * 財務計算などする場合は big.js などを使う必要がある
    * 有効な数値で表現できない場合は `NaN` になり `Number.isNaN` で判定が必要
    * 精度が変更される範囲外は `Infinity` で解決する
    * 最小値 `Number.MIN_VALUE` より小さければ無限小として `0` で扱われる
1. truthyな値の概念をもつ
    * `!!` で本来のbooleanに変換が可能

### Future JavaScript
* クラス定義が可能になり、TypeScriptでは以下をサポート
    * 単一継承として `extends` 
    * 静的メンバ `static` なプロパティ
    * アクセス修飾子 `public` `private` `protected` 
* `abstract` 修飾子をクラスとメンバに利用
* コンストラクタ `constructor`を任意で定義
* ES7 からプロパティ初期化子が利用可能
* TypeScriptで生成されるJavaScriptでは、IIFE `(function() {})()` で包まれる
* アローファンクション `() => {}` で記述すれば `this` `arguments` をレキシカルスコープで捕捉
    * 子クラスで関数をオーバーライドしたら `super` は動作しない( `this` で参照した関数をプロパティに設定することで退避可能)
* 可変長引数 `...arguments` で引数を配列で取得
* `let` は `var` と異なり、スコープを新たに生成
    * 同じ名称であればTypeScriptが新たな名称でJavaScriptを生成
    * クロージャ内で `let` すると、たとえインクリメントされても参照を切り離したアクセスができる
* `const` はイミュータブルにでき、初期化が必須
    * オブジェクトであれば内部プロパティは変更可能
* 分割代入やスプレッド演算子 `...` により展開ができる
    * 配列の分解や一部要素を無視 `var [x, , ...remaining] = [1, 2, 3, 4];` することも可能
    * スプレッド演算子の以前は `Function.prototype.apply` を使う必要があった
* 配列で(keyに対して反復されるため)要素の値を反復しない `for...in` に代わり `for...of` することで反復
* `Iterator` を使用
* バッククォートによるテンプレートリテラル `string${foo}string` で文字列を形成
* `Promise` で非同期処理でも同期処理的なコールバックを記述でき、安全なエラー処理が行える
    * 一度生成すれば以降 `.then` を使ってチェーンして記述できる
    * 並列で処理する場合は `Promise.all` に `Promise` を配列にした引数を渡すことで制御する
* ジェネレータ `function*` を定義し、 `yield` で一時停止/再開させる
* ジェネレータを使った簡易的な非同期処理 `async` `await` でも制御できる

### TypeScript設定ファイル
* `tsc -p [.|Path]` でtsconfig.jsonが検索されてコンパイルが可能
* tsconfig.json 参照

### 宣言空間
* 型宣言空間に定義されたら、型としてのみ参照できる
* 変数宣言空間に定義されたら、変数としてのみ参照できる
    * 型宣言空間に定義された `interface` などは、編集として使用できない

### モジュール
* グローバル名前空間に定義すると名前競合の恐れがあるため、ファイルモジュール `export` `import` で定義することを推奨

## 参照サイト
* https://qiita.com/y_hokkey/items/871c23c24d31021d7c40 ディレクトリ構造
