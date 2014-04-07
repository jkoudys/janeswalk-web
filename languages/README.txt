xgettext --default-domain=messages --output-dir=./ --output=single_pages.pot  --language=PHP --from-code=UTF-8 --add-comments=i18n --keyword --keyword=t:1 --keyword=t2:1,2 --keyword=tc:1c,2 --no-escape --add-location --no-wrap --files-from=translateable.txt
msginit --input=single_pages.pot --output=single_pages.po --no-wrap
