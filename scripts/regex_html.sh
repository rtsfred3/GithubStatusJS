echo "Version $1";

COMMENTREGEX='^( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$'
VERSION=$1
CURRDATE="$(date +%F)"

if [ ! -d autogen/ ]; then mkdir autogen/; fi;
if [ ! -d autogen/amp/ ]; then mkdir autogen/amp/; fi;
if [ ! -d autogen/preact/ ]; then mkdir autogen/preact/; fi;
if [ ! -d autogen/static/ ]; then mkdir autogen/static/; fi;

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

setUrlAndTitleGitHub() {
    sed -i '' -re "s/spstat\.us/githubstat\.us/g" $1
    sed -i '' -re "s/Cloudflare/GitHub/g" $1
}

createTemplatedFile() {
    echo $1
    sed -re "s/-good\.(png|webp)/-$2\.\1/g" StatuspageHTML/tmp/static/index.template.html > $1
    sed -i '' -re "s/{{status}}/$2/g" $1
    sed -i '' -re "s/{{ThemeColor}}/$3/g" $1
    sed -i '' -re "s/{{path}}/$4/g" $1
}

createTemplatedFileGithubStatus() {
    echo "githubstat.us"
    createTemplatedFile $1 $2 $3 $4
    setUrlAndTitleGitHub $1
}

echo "StatuspageHTML/index.html";
cat StatuspageHTML/index.html > StatuspageHTML/tmp/index.tmp.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/index.tmp.html
sed -f scripts/dedup.sed < StatuspageHTML/tmp/index.tmp.html > StatuspageHTML/tmp/index.html

cat StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/index.template.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/static/index.template.html
sed -i '' -f scripts/dedup.sed StatuspageHTML/tmp/static/index.template.html

createTemplatedFileGithubStatus autogen/static/index.good.html good "#339966" ""
createTemplatedFileGithubStatus autogen/static/index.none.html good "#339966" ""
createTemplatedFileGithubStatus autogen/static/index.minor.html minor "#DBAB09" ""
createTemplatedFileGithubStatus autogen/static/index.major.html major "#E25D10" ""
createTemplatedFileGithubStatus autogen/static/index.critical.html critical "#DC3545" ""
createTemplatedFileGithubStatus autogen/static/index.unavailable.html unavailable "#4F93BD" ""
createTemplatedFileGithubStatus autogen/static/index.error.html error "#646464" ""
createTemplatedFileGithubStatus autogen/static/index.maintenance.html maintenance "#0366D6" ""

createTemplatedFile StatuspageHTML/tmp/static/index.shell.html unavailable "#4F93BD" ""
createTemplatedFile StatuspageHTML/tmp/static/status.shell.html unavailable "#4F93BD" "status\/"
createTemplatedFile StatuspageHTML/tmp/static/components.shell.html unavailable "#4F93BD" "components\/"
createTemplatedFile StatuspageHTML/tmp/static/index.error.html error "#646464" ""
createTemplatedFile StatuspageHTML/tmp/static/index.maintenance.html maintenance "#0366D6" ""

echo "StatuspageHTML/amp/index.html";
cat StatuspageHTML/amp/index.html > StatuspageHTML/tmp/amp/index.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/amp/index.html

echo "preact/index.html";
cat preact/index.html > StatuspageHTML/tmp/preact/index.tmp.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/preact/index.tmp.html

echo "StatuspageHTML/sitemap.xml";
sed -i '' -re "s/[0-9]{4}(-[0-9]{2}){2}/$CURRDATE/g" StatuspageHTML/sitemap.xml

echo "sites/reddit/sitemap.xml";
sed -i '' -re "s/[0-9]{4}(-[0-9]{2}){2}/$CURRDATE/g" sites/reddit/sitemap.xml

if [ -f StatuspageHTML/tmp/index.html ]; then cat StatuspageHTML/tmp/index.html > StatuspageHTML/output/index.html; fi;

if [ -f StatuspageHTML/tmp/static/index.shell.html ]; then cat StatuspageHTML/tmp/static/index.shell.html > StatuspageHTML/output/static/index.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/status.shell.html > StatuspageHTML/output/static/status.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/components.shell.html > StatuspageHTML/output/static/components.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/index.error.html ]; then cat StatuspageHTML/tmp/static/index.error.html > StatuspageHTML/output/static/index.error.html; fi;
if [ -f StatuspageHTML/tmp/static/index.maintenance.html ]; then cat StatuspageHTML/tmp/static/index.maintenance.html > StatuspageHTML/output/static/index.maintenance.html; fi;

if [ -f StatuspageHTML/tmp/amp/index.html ]; then cat StatuspageHTML/tmp/amp/index.html > StatuspageHTML/output/amp/index.html; fi;
if [ -f preact/index.html ]; then cat preact/index.html > StatuspageHTML/output/preact/index.html; fi;

# --------------------------------------------------------------------------------------------------------------------------

# rm -r StatuspageHTML/tmp/
# rm -r StatuspageHTML/output/

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/index.html > StatuspageHTML/index.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/status.shell.html > StatuspageHTML/static/status.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/components.shell.html > StatuspageHTML/static/components.shell.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.error.html > StatuspageHTML/static/index.error.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/static/index.maintenance.html > StatuspageHTML/static/index.maintenance.html

# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < StatuspageHTML/amp/index.html > StatuspageHTML/amp/index.html
# IFS=''; while read -r line; do  if [[ ${#line} -gt 0 ]]; then  echo "$line"; fi; done < preact/index.html > preact/index.html