echo "Version $1";

COMMENTREGEX='^( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$'
VERSION=$1

if [ ! -d StatuspageHTML/tmp/ ]; then mkdir StatuspageHTML/tmp/; fi;
if [ ! -d StatuspageHTML/tmp/amp/ ]; then mkdir StatuspageHTML/tmp/amp/; fi;
if [ ! -d StatuspageHTML/tmp/preact/ ]; then mkdir StatuspageHTML/tmp/preact/; fi;
if [ ! -d StatuspageHTML/tmp/static/ ]; then mkdir StatuspageHTML/tmp/static/; fi;

if [ ! -d StatuspageHTML/output/ ]; then mkdir StatuspageHTML/output/; fi;
if [ ! -d StatuspageHTML/output/amp/ ]; then mkdir StatuspageHTML/output/amp/; fi;
if [ ! -d StatuspageHTML/output/preact/ ]; then mkdir StatuspageHTML/output/preact/; fi;
if [ ! -d StatuspageHTML/output/static/ ]; then mkdir StatuspageHTML/output/static/; fi;

setVersionInline() {
    sed -i '' -re "s/{{_?version}}/$VERSION/g" $1
}

removeCommentsInline() {
    sed -i '' -re "/$COMMENTREGEX/d" $1
}

setVersionAndRemoveCommentsInline() {
    removeCommentsInline $1
    setVersionInline $1
}

createTemplatedFile() {
    echo $1
    sed -re "s/-good\.(png|webp)/-$2\.\1/g" StatuspageHTML/static/index.template.html > $1
    sed -i '' -re "s/{{status}}/$2/g" $1
    sed -i '' -re "s/{{ThemeColor}}/$3/g" $1
    sed -i '' -re "s/{{path}}/$4/g" $1
}

echo "StatuspageHTML/index.html";
setVersionAndRemoveCommentsInline StatuspageHTML/index.html
cat StatuspageHTML/index.html > StatuspageHTML/tmp/index.html
sed -f scripts/dedup.sed  < StatuspageHTML/tmp/index.html > StatuspageHTML/index.html

setVersionAndRemoveCommentsInline StatuspageHTML/static/index.template.html
sed -i '' -f scripts/dedup.sed StatuspageHTML/static/index.template.html

createTemplatedFile StatuspageHTML/tmp/static/index.shell.html unavailable "#4F93BD" ""
createTemplatedFile StatuspageHTML/tmp/static/status.shell.html unavailable "#4F93BD" "status\/"
createTemplatedFile StatuspageHTML/tmp/static/components.shell.html unavailable "#4F93BD" "components\/"
createTemplatedFile StatuspageHTML/tmp/static/index.error.html error "#646464" ""
createTemplatedFile StatuspageHTML/tmp/static/index.maintenance.html maintenance "#0366D6" ""

echo "StatuspageHTML/amp/index.html";
setVersionAndRemoveCommentsInline StatuspageHTML/amp/index.html

echo "preact/index.html";
setVersionAndRemoveCommentsInline preact/index.html

if [ -f StatuspageHTML/index.html ]; then cat StatuspageHTML/index.html > StatuspageHTML/output/index.html; fi;

if [ -f StatuspageHTML/tmp/static/index.shell.html ]; then cat StatuspageHTML/tmp/static/index.shell.html > StatuspageHTML/output/static/index.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/status.shell.html > StatuspageHTML/output/static/status.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/components.shell.html > StatuspageHTML/output/static/components.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/index.error.html ]; then cat StatuspageHTML/tmp/static/index.error.html > StatuspageHTML/output/static/index.error.html; fi;
if [ -f StatuspageHTML/tmp/static/index.maintenance.html ]; then cat StatuspageHTML/tmp/static/index.maintenance.html > StatuspageHTML/output/static/index.maintenance.html; fi;

if [ -f StatuspageHTML/amp/index.html ]; then cat StatuspageHTML/amp/index.html > StatuspageHTML/output/amp/index.html; fi;
if [ -f preact/index.html ]; then cat preact/index.html > StatuspageHTML/output/preact/index.html; fi;

open StatuspageHTML/output/

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/index.html > StatuspageHTML/index.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/status.shell.html > StatuspageHTML/static/status.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/components.shell.html > StatuspageHTML/static/components.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.error.html > StatuspageHTML/static/index.error.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.maintenance.html > StatuspageHTML/static/index.maintenance.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/amp/index.html > StatuspageHTML/amp/index.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < preact/index.html > preact/index.html