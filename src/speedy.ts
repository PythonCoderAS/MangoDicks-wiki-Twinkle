import { SpeedyCore, criterion } from './core';

export class Speedy extends SpeedyCore {
	footerlinks = {
		'Twinkle help': 'MangoDicks:Twinkle#speedy',
	};

	preprocessParamInputs() {
		let params = this.params; // shortcut reference
		if (params.banned_user) {
			params.banned_user = params.banned_user.replace(/^\s*User:/i, '');
		}
		if (params.redundantimage_filename) {
			params.redundantimage_filename = new mw.Title(params.redundantimage_filename, 6).toText();
		}
		if (params.commons_filename && params.commons_filename !== Morebits.pageNameNorm) {
			params.commons_filename = new mw.Title(params.commons_filename, 6).toText();
		}
	}

	criteriaLists: Array<{
		label: string;
		visible: (self: Speedy) => boolean;
		list: Array<criterion>;
	}> = [
		{
			label: 'Deletion (Custom Reason)',
			visible: () => true,
			list: [
				{
					label: 'Reason',
					value: 'reason',
					code: 'delete',
					subgroup: {
						name: 'reason_1',
						parameter: '1',
						utparam: '2',
						type: 'input',
						label: 'Rationale: ',
						size: 60,
					},
				},
			],
		},
	];
}
