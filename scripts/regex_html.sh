echo "Version $1";

sed -e 's/{{version}}/$1/g' -re 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/v([0-9]{1,2})-([0-9]{1,2})-.([0-9]{1,2})/v([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})/g' StatuspageHTML/index.html > StatuspageHTML/index.tmp.html

sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/status\//g' -e 's/{{version}}/$1/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/status.shell.tmp.html
sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/components\//g' -e 's/{{version}}/$1/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/components.shell.tmp.html
sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/error/g' -e 's/{{ThemeColor}}/#646464/g' -e 's/{{path}}//g' -e 's/{{version}}/$1/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/index.error.tmp.html
sed -u -r -e 's/( )*<!--([[:space:]]|[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/{{status}}/maintenance/g' -e 's/{{ThemeColor}}/#0366D6/g' -e 's/{{path}}//g' -e 's/{{version}}/$1/g' StatuspageHTML/static/index.template.html > StatuspageHTML/static/index.maintenance.tmp.html

sed -e 's/{{version}}/$1/g' StatuspageHTML/amp/index.html > StatuspageHTML/amp/index.tmp.html
sed  -e 's/{{version}}/$1/g' preact/index.html > preact/index.tmp.html

if [ -f StatuspageHTML/index.tmp.html ]; then cat StatuspageHTML/index.tmp.html > StatuspageHTML/index.html; fi;

if [ -f StatuspageHTML/static/status.shell.tmp.html ]; then cat StatuspageHTML/static/status.shell.tmp.html > StatuspageHTML/static/status.shell.html; fi;
if [ -f StatuspageHTML/static/status.shell.tmp.html ]; then cat StatuspageHTML/static/components.shell.tmp.html > StatuspageHTML/static/components.shell.html; fi;
if [ -f StatuspageHTML/static/index.error.tmp.html ]; then cat StatuspageHTML/static/index.error.tmp.html > StatuspageHTML/static/index.error.html; fi;
if [ -f StatuspageHTML/static/index.maintenance.tmp.html ]; then cat StatuspageHTML/static/index.maintenance.tmp.html > StatuspageHTML/static/index.maintenance.html; fi;

if [ -f StatuspageHTML/amp/index.tmp.html ]; then cat StatuspageHTML/amp/index.tmp.html > StatuspageHTML/amp/index.html; fi;
if [ -f preact/index.tmp.html ]; then cat preact/index.tmp.html > preact/index.html; fi;

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/index.tmp.html > StatuspageHTML/index.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/status.shell.tmp.html > StatuspageHTML/static/status.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/components.shell.tmp.html > StatuspageHTML/static/components.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.error.tmp.html > StatuspageHTML/static/index.error.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.maintenance.tmp.html > StatuspageHTML/static/index.maintenance.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/amp/index.tmp.html > StatuspageHTML/amp/index.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < preact/index.tmp.html > preact/index.html