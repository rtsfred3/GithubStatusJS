echo "Version $1";

if [ ! -d StatuspageHTML/tmp/ ]; then mkdir StatuspageHTML/tmp/; fi;
if [ ! -d StatuspageHTML/tmp/amp/ ]; then mkdir StatuspageHTML/tmp/amp/; fi;
if [ ! -d StatuspageHTML/tmp/preact/ ]; then mkdir StatuspageHTML/tmp/preact/; fi;
if [ ! -d StatuspageHTML/tmp/static/ ]; then mkdir StatuspageHTML/tmp/static/; fi;

if [ ! -d StatuspageHTML/output/ ]; then mkdir StatuspageHTML/output/; fi;
if [ ! -d StatuspageHTML/output/amp/ ]; then mkdir StatuspageHTML/output/amp/; fi;
if [ ! -d StatuspageHTML/output/preact/ ]; then mkdir StatuspageHTML/output/preact/; fi;
if [ ! -d StatuspageHTML/output/static/ ]; then mkdir StatuspageHTML/output/static/; fi;

echo $1;

echo "StatuspageHTML/tmp/index.html";
sed -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' StatuspageHTML/index.html > StatuspageHTML/tmp/index.html
sed -i -re "s/{{version}}/$1/g" StatuspageHTML/tmp/index.html
sed -i -re 's/v([0-9]{1,2})-([0-9]{1,2})-.([0-9]{1,2})/v([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})/g' StatuspageHTML/tmp/index.html
# sed -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e "s/{{version}}/$1/g" -e 's/v([0-9]{1,2})-([0-9]{1,2})-.([0-9]{1,2})/v([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})/g' StatuspageHTML/index.html > StatuspageHTML/tmp/index.html

echo "StatuspageHTML/tmp/static/index.shell.html";
sed -u -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -re 's/-good\.(png|webp)/-unavailable\.\1/g' -re 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}//g' -e "s/{{version}}/$1/g" StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/index.shell.html

echo "StatuspageHTML/tmp/static/status.shell.html";
sed -u -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/-good\.(png|webp)/-unavailable\.\1/g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/status\//g' -e "s/{{version}}/$1/g" StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/status.shell.html

echo "StatuspageHTML/tmp/static/components.shell.html";
sed -u -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/-good\.(png|webp)/-unavailable\.\1/g' -e 's/{{status}}/loading/g' -e 's/{{ThemeColor}}/#4F93BD/g' -e 's/{{path}}/components\//g' -e "s/{{version}}/$1/g" StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/components.shell.html

echo "StatuspageHTML/tmp/static/index.error.html";
sed -u -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/-good\.(png|webp)/-error\.\1/g' -e 's/{{status}}/error/g' -e 's/{{ThemeColor}}/#646464/g' -e 's/{{path}}//g' -e "s/{{version}}/$1/g" StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/index.error.html

echo "StatuspageHTML/tmp/static/index.maintenance.html";
sed -u -re 's/( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$//g' -e 's/-good\.(png|webp)/-maintenance\.\1/g' -e 's/{{status}}/maintenance/g' -e 's/{{ThemeColor}}/#0366D6/g' -e 's/{{path}}//g' -e "s/{{version}}/$1/g" StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/index.maintenance.html

echo "StatuspageHTML/tmp/amp/index.html";
sed -e "s/{{version}}/$1/g" StatuspageHTML/amp/index.html > StatuspageHTML/tmp/amp/index.html

echo "StatuspageHTML/tmp/preact/index.html";
sed -e "s/{{version}}/$1/g" preact/index.html > StatuspageHTML/tmp/preact/index.html

if [ -f StatuspageHTML/tmp/index.html ]; then cat StatuspageHTML/tmp/index.html > StatuspageHTML/output/index.html; fi;

if [ -f StatuspageHTML/tmp/static/index.shell.html ]; then cat StatuspageHTML/tmp/static/index.shell.html > StatuspageHTML/output/static/index.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/status.shell.html > StatuspageHTML/output/static/status.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/components.shell.html > StatuspageHTML/output/static/components.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/index.error.html ]; then cat StatuspageHTML/tmp/static/index.error.html > StatuspageHTML/output/static/index.error.html; fi;
if [ -f StatuspageHTML/tmp/static/index.maintenance.html ]; then cat StatuspageHTML/tmp/static/index.maintenance.html > StatuspageHTML/output/static/index.maintenance.html; fi;

if [ -f StatuspageHTML/tmp/amp/index.html ]; then cat StatuspageHTML/tmp/amp/index.html > StatuspageHTML/output/amp/index.html; fi;
if [ -f StatuspageHTML/tmp/preact/index.html ]; then cat StatuspageHTML/tmp/preact/index.html > StatuspageHTML/output/preact/index.html; fi;

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/index.html > StatuspageHTML/index.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/status.shell.html > StatuspageHTML/static/status.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/components.shell.html > StatuspageHTML/static/components.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.error.html > StatuspageHTML/static/index.error.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.maintenance.html > StatuspageHTML/static/index.maintenance.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/amp/index.html > StatuspageHTML/amp/index.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < preact/index.html > preact/index.html