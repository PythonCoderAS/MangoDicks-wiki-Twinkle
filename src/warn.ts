import { WarnCore, obj_entries, warningLevel } from './core';

export class Warn extends WarnCore {
	footerlinks = {
		'Choosing a warning level': 'WP:UWUL#Levels',
		'Warn prefs': 'WP:TW/PREF#warn',
		'Twinkle help': 'WP:TW/DOC#warn',
		'Give feedback': 'WT:TW',
	};

	warningLevels: Record<
		string,
		{
			label: string;
			summaryPrefix?: string;
			selected: (pref: number) => boolean;
			visible?: () => boolean;
		}
	> = {
		level1: {
			label: 'Level 1',
			selected: (pref) => pref === 1,
		},
		level2: {
			label: 'Level 2',
			selected: (pref) => pref === 2,
		},
		level3: {
			label: 'Level 3',
			selected: (pref) => pref === 3,
		},
		level4: {
			label: 'Level 4 (final)',
			selected: (pref) => pref === 4,
		},
	};

	processWarnings() {
		type MessageConfig = {
			label: string;
			summary: string;
			heading?: string;
			suppressArticleInSummary?: true;
		};
		type MessagesType = {
			levels: Record<string, Record<string, Record<string, MessageConfig>>>;
			singlenotice: Record<string, MessageConfig>;
			singlewarn: Record<string, MessageConfig>;
		};

		const messages: MessagesType = {
			levels: {
				'Common warnings': {
					'uw-vandalism': {
						level1: {
							label: 'Vandalism',
							summary: 'General note: Unconstructive editing',
						},
						level2: {
							label: 'Vandalism',
							summary: 'Caution: Unconstructive editing',
						},
						level3: {
							label: 'Vandalism',
							summary: 'Warning: Vandalism',
						},
						level4: {
							label: 'Vandalism',
							summary: 'Final warning: Vandalism',
						},
						level4im: {
							label: 'Vandalism',
							summary: 'Only warning: Vandalism',
						},
					},
					'uw-generic': {
						level1: {
							label: 'Generic warning (for template series missing level 1)',
							summary: 'First warning notice',
						},
						level2: {
							label: 'Generic warning (for template series missing level 2)',
							summary: 'Second warning notice',
						},
						level3: {
							label: 'Generic warning (for template series missing level 3)',
							summary: 'Third warning notice',
						},
						level4: {
							label: 'Generic warning (for template series missing level 4)',
							summary: 'Final warning notice',
						},
					},
				},
			},
			singlenotice: {},
			singlewarn: {},
		};

		let groupObject: warningLevel['list'] = {
			'Common warnings': [],
		};

		let groups: Record<string, warningLevel> = {
			level1: { label: '1: General note', list: $.extend(true, {}, groupObject) },
			level2: { label: '2: Caution', list: $.extend(true, {}, groupObject) },
			level3: { label: '3: Warning', list: $.extend(true, {}, groupObject) },
			level4: { label: '4: Final warning', list: $.extend(true, {}, groupObject) },
		};

		for (let [subgroupName, templateSet] of obj_entries(messages.levels)) {
			for (let [templateName, templateLevels] of obj_entries(templateSet)) {
				for (let [level, templateData] of obj_entries(templateLevels)) {
					groups[level].list[subgroupName].push(
						$.extend(
							{
								template: templateName + level.slice('level'.length),
							},
							templateData
						)
					);
				}
			}
		}

		this.warnings = groups;
	}

	getWarningWikitext(templateName, article, reason, isCustom) {
		const text = '{{subst:' + templateName + '}}';
		return text + ' ~~~~';
	}
}
