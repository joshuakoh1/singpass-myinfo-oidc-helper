import * as _ from "lodash";
import { FakeProfile, ProfileArchetype } from "./fake-profile";
import { mrSGDaddyPerfect } from "./mrSGDaddyPerfect";

const id = "F2734981K";
const name = ProfileArchetype.MR_JAPANESE_NO_ADDRESS_OBJECT;

export const mrJapaneseNoAddressObject: FakeProfile = {
	id,
	name,
	generate: (profileName) => {
		profileName = _.isEmpty(profileName) ? name : profileName;

		const profile = mrSGDaddyPerfect.generate(profileName);
		profile.residentialstatus = {
			"code": "",
			"desc": "",
			"source": "3",
			"classification": "C",
			"lastupdated": "",
		};
		profile.nationality = {
			"code": "JP",
			"desc": "JAPANESE",
			"source": "1",
			"classification": "C",
			"lastupdated": "2019-09-18",
		};
		profile.birthcountry = {
			"code": "JP",
			"desc": "JAPAN",
			"source": "1",
			"classification": "C",
			"lastupdated": "2019-09-18",

		};
		profile.dob = {
			"lastupdated": "2018-06-01",
			"source": "1",
			"classification": "C",
			"value": "1983-10-06",
		};
		profile.regadd = undefined;

		return profile;
	},
};
