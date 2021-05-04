# Git

## コマンド例

### 既存のリポジトリを作成
```
$ # クローン
$ git clone git@github.com:devhyukke/ToP.git
$
$ # Git Flow 初期化
$ git flow init -d
```

* `git flow init`
    * `-d` デフォルトのブランチ名を使用する

### ブランチを確認
```
$ git branch
```

### feature を開始
```
$ # 開始元のブランチを最新化
$ git checkout develop
$ git pull -p -t
$
$ # feature を開始
$ git flow feature start [branch_name]
$
$ # 追跡ブランチでプッシュ
$ git push -u origin feature/[branch_name]
```

* `git pull` 
    * `-p` `--prune` リモートの無くなったブランチをローカルにも反映
    * `-t` `--tags` リモートのタグをローカルに反映

### feature を更新
```
$ git fetch -p -t
$
$ git checkout feature/[branch_name]
$
$ git pull
```

* `git fetch` 
    * `-p` `--prune` リモードの無くなったブランチをローカルにも反映
    * `-t` `--tags` リモートのタグをローカルに反映

### feature を開始元でリベース
```
$ # 開始元のブランチを最新化
$ git checkout develop
$ git pull -p
$
$ # feature に切り替え
$ git checkout feature/[branch_name]
$
$ # feature をリベース＆強制プッシュ
$ git rebase develop
$
$ git push --force origin HEAD
```

* `git push`
    * `--force` ローカルを強制にリモートに反映

### コミット
```
$ # 修正ファイルをステージに追加
$ git add .
$ git status
$
$ # ファイルをコミット＆プッシュ
$ git commit -m "feat: xxxx
$
$ Xxxx"
$
$ git push origin feature/[branch_name]
```

### 変更をすべて取り消し
```
$ git checkout .
```

### ブランチを削除
```
$ git branch -D feature/[branch_name]
```

* `git branch`
    * `-D` 強制的に削除
