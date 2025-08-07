COMMENTREGEX='^( )*<!--( |[a-zA-Z0-9]|[=\.\/"<>:-])+-->$'
VERSION=$1
REGEXVERSION=$(echo $VERSION | sed -re 's/v?([0-9]{1,2})\.([0-9]{1,2})\.([0-9]{1,2})/\1\.\2\.\3/g')
CURRDATE="$(date +%F)"

echo "Version $1";
echo "Version $REGEXVERSION";

FOLDERS_LIST=("amp" "preact" "static" "status");

if [ ! -d autogen/ ]; then mkdir autogen/; fi;
if [ ! -d StatuspageHTML/tmp/ ]; then mkdir StatuspageHTML/tmp/; fi;
if [ ! -d StatuspageHTML/output/ ]; then mkdir StatuspageHTML/output/; fi;

for f in ${FOLDERS_LIST[@]}; do
    if [ ! -d autogen/$f/ ]; then mkdir autogen/$f/; fi;
    if [ ! -d StatuspageHTML/tmp/$f/ ]; then mkdir StatuspageHTML/tmp/$f/; fi;
    if [ ! -d StatuspageHTML/output/$f/ ]; then mkdir StatuspageHTML/output/$f/; fi;
done

setSiteName() {
    sed -i '' -re "s/{{siteName}}/$2/g" $1
}

setStatus() {
    sed -i '' -re "s/{{status}}/$2/g" $1
}

setThemeColor() {
    sed -i '' -re "s/{{ThemeColor}}/$2/g" $1
}

setPath() {
    sed -i '' -re "s/{{path}}/$2/g" $1
}

setVersionInline() {
    sed -i '' -re "s/{{_?version}}/$REGEXVERSION/g" $1
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
    setSiteName $1 GitHub
}

createTemplatedFile() {
    echo $1
    sed -re "s/-good\.(png|webp)/-$2\.\1/g" StatuspageHTML/tmp/static/index.template.html > $1
    setSiteName $1 Cloudflare
    setStatus $1 $2
    setThemeColor $1 $3
    setPath $1 $4
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

echo "StatuspageHTML/status/index.html";
cat StatuspageHTML/status/index.html > StatuspageHTML/tmp/status/index.tmp.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/status/index.tmp.html
sed -f scripts/dedup.sed < StatuspageHTML/tmp/status/index.tmp.html > StatuspageHTML/tmp/status/index.html

cat StatuspageHTML/static/index.template.html > StatuspageHTML/tmp/static/index.template.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/static/index.template.html
sed -i '' -f scripts/dedup.sed StatuspageHTML/tmp/static/index.template.html

createTemplatedFileGithubStatus autogen/static/index.good.html good "#339966" ""
createTemplatedFileGithubStatus autogen/static/index.none.html good "#339966" ""
createTemplatedFileGithubStatus autogen/static/index.minor.html minor "#DBAB09" ""
createTemplatedFileGithubStatus autogen/static/index.major.html major "#E25D10" ""
createTemplatedFileGithubStatus autogen/static/index.critical.html critical "#DC3545" ""
createTemplatedFileGithubStatus autogen/static/index.unavailable.html unavailable "#4F93BD" ""
createTemplatedFileGithubStatus autogen/static/index.loading.html loading "#4F93BD" ""
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

echo "StatuspageHTML/preact/index.html";
cat StatuspageHTML/preact/index.html > StatuspageHTML/tmp/preact/index.tmp.html
setVersionAndRemoveCommentsInline StatuspageHTML/tmp/preact/index.tmp.html

echo "StatuspageHTML/sitemap.xml";
sed -i '' -re "s/[0-9]{4}(-[0-9]{2}){2}/$CURRDATE/g" StatuspageHTML/sitemap.xml

echo "sites/reddit/sitemap.xml";
sed -i '' -re "s/[0-9]{4}(-[0-9]{2}){2}/$CURRDATE/g" sites/reddit/sitemap.xml

if [ -f StatuspageHTML/tmp/index.html ]; then cat StatuspageHTML/tmp/index.html > StatuspageHTML/output/index.html; fi;
if [ -f StatuspageHTML/tmp/status/index.html ]; then cat StatuspageHTML/tmp/status/index.html > StatuspageHTML/output/status/index.html; fi;

if [ -f StatuspageHTML/tmp/static/index.shell.html ]; then cat StatuspageHTML/tmp/static/index.shell.html > StatuspageHTML/output/static/index.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/status.shell.html > StatuspageHTML/output/static/status.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/status.shell.html ]; then cat StatuspageHTML/tmp/static/components.shell.html > StatuspageHTML/output/static/components.shell.html; fi;
if [ -f StatuspageHTML/tmp/static/index.error.html ]; then cat StatuspageHTML/tmp/static/index.error.html > StatuspageHTML/output/static/index.error.html; fi;
if [ -f StatuspageHTML/tmp/static/index.maintenance.html ]; then cat StatuspageHTML/tmp/static/index.maintenance.html > StatuspageHTML/output/static/index.maintenance.html; fi;

if [ -f StatuspageHTML/tmp/amp/index.html ]; then cat StatuspageHTML/tmp/amp/index.html > StatuspageHTML/output/amp/index.html; fi;
if [ -f StatuspageHTML/tmp/preact/index.tmp.html ]; then cat StatuspageHTML/tmp/preact/index.tmp.html > StatuspageHTML/output/preact/index.html; fi;

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