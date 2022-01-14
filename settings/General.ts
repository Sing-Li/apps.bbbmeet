import {ISetting, SettingType} from '@rocket.chat/apps-engine/definition/settings'

export const GeneralSettings: Record<string, ISetting> = {
    bbbServer: {
        id: 'BBB_ServerUrl',
        i18nLabel: 'Big Blue Button Server URL',
        packageValue: 'https://demo.bigbluebutton.org',
        type: SettingType.STRING,
        public: true,
        required: true
    },
    timeZone: {
        id: 'BBB_AdminTimeZone',
        // tslint:disable-next-line: quotemark
        i18nLabel: "Admin's timezone",
        packageValue: '',
        type: SettingType.SELECT,
        public: true,
        required: true,
        values: [
            {
                key: '+00:00',
                i18nLabel: 'Africa/Abidjan (+00:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Africa/Accra (+00:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Algiers (+01:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Africa/Bissau (+00:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Cairo (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Casablanca (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Ceuta (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/El_Aaiun (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Johannesburg (+02:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Juba (+02:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Khartoum (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Lagos (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Maputo (+02:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Africa/Monrovia (+00:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Africa/Nairobi (+03:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Ndjamena (+01:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Africa/Sao_Tome (+00:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Tripoli (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Africa/Tunis (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Africa/Windhoek (+02:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'America/Adak (-10:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Anchorage (-09:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Araguaina (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Buenos_Aires (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Catamarca (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Cordoba (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Jujuy (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/La_Rioja (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Mendoza (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Rio_Gallegos (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Salta (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/San_Juan (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/San_Luis (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Tucuman (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Argentina/Ushuaia (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Asuncion (-03:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Atikokan (-05:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Bahia (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Bahia_Banderas (-06:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Barbados (-04:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Belem (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Belize (-06:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Blanc-Sablon (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Boa_Vista (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Bogota (-05:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Boise (-07:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Cambridge_Bay (-07:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Campo_Grande (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Cancun (-05:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Caracas (-04:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Cayenne (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Chicago (-06:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Chihuahua (-07:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Costa_Rica (-06:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Creston (-07:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Cuiaba (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Curacao (-04:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'America/Danmarkshavn (+00:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Dawson (-07:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Dawson_Creek (-07:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Denver (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Detroit (-05:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Edmonton (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Eirunepe (-05:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/El_Salvador (-06:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Fort_Nelson (-07:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Fortaleza (-03:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Glace_Bay (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Goose_Bay (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Grand_Turk (-05:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Guatemala (-06:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Guayaquil (-05:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Guyana (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Halifax (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Havana (-05:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Hermosillo (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Indianapolis (-05:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Indiana/Knox (-06:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Marengo (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Petersburg (-05:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Indiana/Tell_City (-06:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Vevay (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Vincennes (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Indiana/Winamac (-05:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Inuvik (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Iqaluit (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Jamaica (-05:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Juneau (-09:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Kentucky/Louisville (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Kentucky/Monticello (-05:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/La_Paz (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Lima (-05:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'America/Los_Angeles (-08:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Maceio (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Managua (-06:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Manaus (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Martinique (-04:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Matamoros (-06:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Mazatlan (-07:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Menominee (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Merida (-06:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Metlakatla (-09:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Mexico_City (-06:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Miquelon (-03:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Moncton (-04:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Monterrey (-06:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Montevideo (-03:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Nassau (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/New_York (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Nipigon (-05:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Nome (-09:00)'
            },
            {
                key: '-02:00',
                i18nLabel: 'America/Noronha (-02:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/North_Dakota/Beulah (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/North_Dakota/Center (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/North_Dakota/New_Salem (-06:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Nuuk (-03:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Ojinaga (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Panama (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Pangnirtung (-05:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Paramaribo (-03:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Phoenix (-07:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Port-au-Prince (-05:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Port_of_Spain (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Porto_Velho (-04:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Puerto_Rico (-04:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Punta_Arenas (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Rainy_River (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Rankin_Inlet (-06:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Recife (-03:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Regina (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Resolute (-06:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Rio_Branco (-05:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Santarem (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Santiago (-03:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Santo_Domingo (-04:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'America/Sao_Paulo (-03:00)'
            },
            {
                key: '-01:00',
                i18nLabel: 'America/Scoresbysund (-01:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Sitka (-09:00)'
            },
            {
                key: '-03:30',
                i18nLabel: 'America/St_Johns (-03:30)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Swift_Current (-06:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Tegucigalpa (-06:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'America/Thule (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Thunder_Bay (-05:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'America/Tijuana (-08:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'America/Toronto (-05:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'America/Vancouver (-08:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Whitehorse (-07:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'America/Winnipeg (-06:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'America/Yakutat (-09:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'America/Yellowknife (-07:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Antarctica/Casey (+11:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Antarctica/Davis (+07:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Antarctica/DumontDUrville (+10:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Antarctica/Macquarie (+11:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Antarctica/Mawson (+05:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'Antarctica/Palmer (-03:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'Antarctica/Rothera (-03:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Antarctica/Syowa (+03:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Antarctica/Troll (+00:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Antarctica/Vostok (+06:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Almaty (+06:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Amman (+02:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Asia/Anadyr (+12:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Aqtau (+05:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Aqtobe (+05:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Ashgabat (+05:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Atyrau (+05:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Asia/Baghdad (+03:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Asia/Baku (+04:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Bangkok (+07:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Barnaul (+07:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Beirut (+02:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Bishkek (+06:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Brunei (+08:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Chita (+09:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Choibalsan (+08:00)'
            },
            {
                key: '+05:30',
                i18nLabel: 'Asia/Colombo (+05:30)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Damascus (+02:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Dhaka (+06:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Dili (+09:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Asia/Dubai (+04:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Dushanbe (+05:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Famagusta (+02:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Gaza (+02:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Hebron (+02:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Ho_Chi_Minh (+07:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Hong_Kong (+08:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Hovd (+07:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Irkutsk (+08:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Jakarta (+07:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Jayapura (+09:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Jerusalem (+02:00)'
            },
            {
                key: '+04:30',
                i18nLabel: 'Asia/Kabul (+04:30)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Asia/Kamchatka (+12:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Karachi (+05:00)'
            },
            {
                key: '+05:45',
                i18nLabel: 'Asia/Kathmandu (+05:45)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Khandyga (+09:00)'
            },
            {
                key: '+05:30',
                i18nLabel: 'Asia/Kolkata (+05:30)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Krasnoyarsk (+07:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Kuala_Lumpur (+08:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Kuching (+08:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Macau (+08:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Asia/Magadan (+11:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Makassar (+08:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Manila (+08:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Asia/Nicosia (+02:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Novokuznetsk (+07:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Novosibirsk (+07:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Omsk (+06:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Oral (+05:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Pontianak (+07:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Pyongyang (+09:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Asia/Qatar (+03:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Qostanay (+06:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Qyzylorda (+05:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Asia/Riyadh (+03:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Asia/Sakhalin (+11:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Samarkand (+05:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Seoul (+09:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Shanghai (+08:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Singapore (+08:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Asia/Srednekolymsk (+11:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Taipei (+08:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Tashkent (+05:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Asia/Tbilisi (+04:00)'
            },
            {
                key: '+03:30',
                i18nLabel: 'Asia/Tehran (+03:30)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Thimphu (+06:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Tokyo (+09:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Asia/Tomsk (+07:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Asia/Ulaanbaatar (+08:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Asia/Urumqi (+06:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Asia/Ust-Nera (+10:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Asia/Vladivostok (+10:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Asia/Yakutsk (+09:00)'
            },
            {
                key: '+06:30',
                i18nLabel: 'Asia/Yangon (+06:30)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Asia/Yekaterinburg (+05:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Asia/Yerevan (+04:00)'
            },
            {
                key: '-01:00',
                i18nLabel: 'Atlantic/Azores (-01:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'Atlantic/Bermuda (-04:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Atlantic/Canary (+00:00)'
            },
            {
                key: '-01:00',
                i18nLabel: 'Atlantic/Cape_Verde (-01:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Atlantic/Faroe (+00:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Atlantic/Madeira (+00:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Atlantic/Reykjavik (+00:00)'
            },
            {
                key: '-02:00',
                i18nLabel: 'Atlantic/South_Georgia (-02:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'Atlantic/Stanley (-03:00)'
            },
            {
                key: '+10:30',
                i18nLabel: 'Australia/Adelaide (+10:30)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Australia/Brisbane (+10:00)'
            },
            {
                key: '+10:30',
                i18nLabel: 'Australia/Broken_Hill (+10:30)'
            },
            {
                key: '+09:30',
                i18nLabel: 'Australia/Darwin (+09:30)'
            },
            {
                key: '+08:45',
                i18nLabel: 'Australia/Eucla (+08:45)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Australia/Hobart (+11:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Australia/Lindeman (+10:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Australia/Lord_Howe (+11:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Australia/Melbourne (+11:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Australia/Perth (+08:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Australia/Sydney (+11:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'CET (+01:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'CST6CDT (-06:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'EET (+02:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'EST (-05:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'EST5EDT (-05:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Etc/GMT (+00:00)'
            },
            {
                key: '-01:00',
                i18nLabel: 'Etc/GMT+1 (-01:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'Etc/GMT+10 (-10:00)'
            },
            {
                key: '-11:00',
                i18nLabel: 'Etc/GMT+11 (-11:00)'
            },
            {
                key: '-12:00',
                i18nLabel: 'Etc/GMT+12 (-12:00)'
            },
            {
                key: '-02:00',
                i18nLabel: 'Etc/GMT+2 (-02:00)'
            },
            {
                key: '-03:00',
                i18nLabel: 'Etc/GMT+3 (-03:00)'
            },
            {
                key: '-04:00',
                i18nLabel: 'Etc/GMT+4 (-04:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'Etc/GMT+5 (-05:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'Etc/GMT+6 (-06:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'Etc/GMT+7 (-07:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'Etc/GMT+8 (-08:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'Etc/GMT+9 (-09:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Etc/GMT-1 (+01:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Etc/GMT-10 (+10:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Etc/GMT-11 (+11:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Etc/GMT-12 (+12:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Etc/GMT-13 (+13:00)'
            },
            {
                key: '+14:00',
                i18nLabel: 'Etc/GMT-14 (+14:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Etc/GMT-2 (+02:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Etc/GMT-3 (+03:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Etc/GMT-4 (+04:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Etc/GMT-5 (+05:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Etc/GMT-6 (+06:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Etc/GMT-7 (+07:00)'
            },
            {
                key: '+08:00',
                i18nLabel: 'Etc/GMT-8 (+08:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Etc/GMT-9 (+09:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Etc/UTC (+00:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Amsterdam (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Andorra (+01:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Europe/Astrakhan (+04:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Athens (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Belgrade (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Berlin (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Brussels (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Bucharest (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Budapest (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Chisinau (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Copenhagen (+01:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Europe/Dublin (+00:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Gibraltar (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Helsinki (+02:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Istanbul (+03:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Kaliningrad (+02:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Kiev (+02:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Kirov (+03:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Europe/Lisbon (+00:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'Europe/London (+00:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Luxembourg (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Madrid (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Malta (+01:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Minsk (+03:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Monaco (+01:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Moscow (+03:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Oslo (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Paris (+01:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Prague (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Riga (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Rome (+01:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Europe/Samara (+04:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Europe/Saratov (+04:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Simferopol (+03:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Sofia (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Stockholm (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Tallinn (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Tirane (+01:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Europe/Ulyanovsk (+04:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Uzhgorod (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Vienna (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Vilnius (+02:00)'
            },
            {
                key: '+03:00',
                i18nLabel: 'Europe/Volgograd (+03:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Warsaw (+01:00)'
            },
            {
                key: '+02:00',
                i18nLabel: 'Europe/Zaporozhye (+02:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'Europe/Zurich (+01:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'HST (-10:00)'
            },
            {
                key: '+06:00',
                i18nLabel: 'Indian/Chagos (+06:00)'
            },
            {
                key: '+07:00',
                i18nLabel: 'Indian/Christmas (+07:00)'
            },
            {
                key: '+06:30',
                i18nLabel: 'Indian/Cocos (+06:30)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Indian/Kerguelen (+05:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Indian/Mahe (+04:00)'
            },
            {
                key: '+05:00',
                i18nLabel: 'Indian/Maldives (+05:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Indian/Mauritius (+04:00)'
            },
            {
                key: '+04:00',
                i18nLabel: 'Indian/Reunion (+04:00)'
            },
            {
                key: '+01:00',
                i18nLabel: 'MET (+01:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'MST (-07:00)'
            },
            {
                key: '-07:00',
                i18nLabel: 'MST7MDT (-07:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'PST8PDT (-08:00)'
            },
            {
                key: '+14:00',
                i18nLabel: 'Pacific/Apia (+14:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Pacific/Auckland (+13:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Bougainville (+11:00)'
            },
            {
                key: '+13:45',
                i18nLabel: 'Pacific/Chatham (+13:45)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Pacific/Chuuk (+10:00)'
            },
            {
                key: '-05:00',
                i18nLabel: 'Pacific/Easter (-05:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Efate (+11:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Pacific/Enderbury (+13:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Pacific/Fakaofo (+13:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Pacific/Fiji (+13:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Funafuti (+12:00)'
            },
            {
                key: '-06:00',
                i18nLabel: 'Pacific/Galapagos (-06:00)'
            },
            {
                key: '-09:00',
                i18nLabel: 'Pacific/Gambier (-09:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Guadalcanal (+11:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Pacific/Guam (+10:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'Pacific/Honolulu (-10:00)'
            },
            {
                key: '+14:00',
                i18nLabel: 'Pacific/Kiritimati (+14:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Kosrae (+11:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Kwajalein (+12:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Majuro (+12:00)'
            },
            {
                key: '-09:30',
                i18nLabel: 'Pacific/Marquesas (-09:30)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Nauru (+12:00)'
            },
            {
                key: '-11:00',
                i18nLabel: 'Pacific/Niue (-11:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Norfolk (+12:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Noumea (+11:00)'
            },
            {
                key: '-11:00',
                i18nLabel: 'Pacific/Pago_Pago (-11:00)'
            },
            {
                key: '+09:00',
                i18nLabel: 'Pacific/Palau (+09:00)'
            },
            {
                key: '-08:00',
                i18nLabel: 'Pacific/Pitcairn (-08:00)'
            },
            {
                key: '+11:00',
                i18nLabel: 'Pacific/Pohnpei (+11:00)'
            },
            {
                key: '+10:00',
                i18nLabel: 'Pacific/Port_Moresby (+10:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'Pacific/Rarotonga (-10:00)'
            },
            {
                key: '-10:00',
                i18nLabel: 'Pacific/Tahiti (-10:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Tarawa (+12:00)'
            },
            {
                key: '+13:00',
                i18nLabel: 'Pacific/Tongatapu (+13:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Wake (+12:00)'
            },
            {
                key: '+12:00',
                i18nLabel: 'Pacific/Wallis (+12:00)'
            },
            {
                key: '+00:00',
                i18nLabel: 'WET (+00:00)'
            }
        ]
    }
}
