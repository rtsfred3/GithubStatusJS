sed -e 's/{{version}}/${{ steps.version.outputs.version }}/g' -re 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/v([0-9]{1,2})-([0-9]{1,2})-.([0-9]{1,2})/v([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})/g' StatuspageHTML/index.html > StatuspageHTML/index.tmp.html

sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/status\//g' -e 's/{{version}}/${{ steps.version.outputs.version }}/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/status.shell.html

sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/components\//g' -e 's/{{version}}/${{ steps.version.outputs.version }}/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/components.shell.html

sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/error/g' -e 's/{{ThemeColor}}/#646464/g' -e 's/{{path}}//g' -e 's/{{version}}/${{ steps.version.outputs.version }}/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/index.error.html

sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/maintenance/g' -e 's/{{ThemeColor}}/#0366D6/g' -e 's/{{path}}//g' -e 's/{{version}}/${{ steps.version.outputs.version }}/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/index.maintenance.html

sed -e 's/{{version}}/${{ steps.version.outputs.version }}/g' StatuspageHTML/amp/index.html > StatuspageHTML/amp/index.tmp.html

sed  -e 's/{{version}}/${{ steps.version.outputs.version }}/g' preact/index.html > preact/index.tmp.html

IFS=''; while read -r line;
do 
    if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; 
done < StatuspageHTML/index.tmp.html > StatuspageHTML/index.html

IFS=''; while read -r line;
do 
    if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; 
done < StatuspageHTML/amp/index.tmp.html > StatuspageHTML/amp/index.html

IFS=''; while read -r line;
do 
    if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; 
done < preact/index.tmp.html > preact/index.html

# cat StatuspageHTML/index.tmp.html > StatuspageHTML/index.html
# cat StatuspageHTML/amp/index.tmp.html > StatuspageHTML/amp/index.html
# cat preact/index.tmp.html > preact/index.html