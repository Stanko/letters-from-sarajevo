# Letters From Sarajevo

Work in progress!

Adaptation of the book "Letters From Sarajevo" for web.

## Setup

Prerequisites

* Node 12+
* Ruby 2.3+

### MacOS

You should probably install separate ruby from the one coming with OS. Follow this answer on StackOverflow: https://stackoverflow.com/a/54873916

Then install jekyll and bundler gems:

```
gem install jekyll bundler
```

In project folder run:

```
bundle install
```

and

```
npm install
```

### NPM tasks

* `npm run dev` 

  Use this command for development. It will start jekyll server (with livereload), and watch for any changes on SCSS and JS files.

* `npm start` 

  Use this command for writing new posts. this command will start jekyll server (with livereload) but won't watch on SCSS and JS file changes.


## Notes for ruby installed by brew on MacOS

If you have ruby installed by brew, please make sure you are using it along with it's gems.

You should add something like this to your `.bash_profile`.

```sh
# Use ruby installed by brew
export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/2.6.0/bin/:$PATH"
```
