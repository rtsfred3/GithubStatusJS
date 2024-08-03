import os, sys, re

regex = r"(\s*<script>\s*if\('serviceWorker' in navigator\){ navigator\.serviceWorker\.register\('\/sw\.js'\)\.then\(\(reg\) => console\.log\(reg\)\)\.catch\(\(err\) => console\.log\(err\)\); }\s*<\/script>)"

with open(sys.argv[1],"r") as file:
    result = re.sub(regex, "", file.read(), 1)

with open(sys.argv[1],"w") as file:
    file.write(result)