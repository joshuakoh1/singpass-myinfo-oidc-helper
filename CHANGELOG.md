# Changelogs
## 3.0.3
- Changed basic person and Mr SG Daddy Perfect email addresses from "myinfotesting@gmail.com" to test email address
- Changed the phone numbers of basic person, Mr SG Perfect, and profiles with sponsored children to the test number

## 3.0.2
- Added dynamic dob to baseProfile to ensure profile is always age 59

## 3.0.1

- added uneditable field sex to mrSGDaddyMissingUneditableFields mock profile

---

## 2.3.4

- Updated comments regarding axios proxy-agent
- Organized imports for index.ts

---

## 2.3.3

- Update axios client to use proxy-agent (https://github.com/axios/axios/issues/925#issuecomment-419352052)

---

## 2.3.2

- Replaced with axios-https-proxy-fix with axios (https://github.com/axios/axios/issues/925)

## 2.3.0

- Sync'd configurations with mol-lib-connfig
- Updated dependencies

---

## 2.2.27

- added fake profiles for SG/PR with no local addresses
- added fake profile for foreigner with blank address fields
- added fake profile for foreigner with absent address object

---

## 2.1.0

- Using mol-lib-config
- Removed baseurl (doesn't play nice with declaration files)
- Updated with myinfo v3 Person declarations
- Added prepush scripts to ensure code quality
