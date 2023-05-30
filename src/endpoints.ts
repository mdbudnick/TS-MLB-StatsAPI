import { notDeepEqual } from "assert";

const BASE_URL = "https://statsapi.mlb.com/api/";

export interface EndpointDefinition {
    url: string;
    path_params: {
      [key: string]: {
        type: string;
        default: string | boolean | null;
        leading_slash: boolean;
        trailing_slash: boolean;
        required: boolean;
        [key: string]: string | null | boolean | undefined;
      };
    };
    query_params: string[];
    required_params: string[];
    note?: string | undefined;
  }

const attendance: EndpointDefinition = {
        "url": BASE_URL + "{ver}/attendance",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "teamId",
            "leagueId",
            "season",
            "date",
            "leagueListId",
            "gameType",
            "fields",
        ],
        "required_params": ["teamId", "leagueId", "leagueListId"],
    }
const awards: EndpointDefinition = {
        "url": BASE_URL + "{ver}/awards{awardId}{recipients}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "awardId": {
                "type": "str",
                "default": null,
                "leading_slash": true,
                "trailing_slash": false,
                "required": false,
            },
            "recipients": {
                "type": "bool",
                "default": true,
                "true": "/recipients",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
        },
        "query_params": ["sportId", "leagueId", "season", "hydrate", "fields"],
        "required_params": [],
        "note": "Call awards endpoint with no parameters to return a list of awardIds.",
    }
const conferences: EndpointDefinition = {
        "url": BASE_URL + "{ver}/conferences",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["conferenceId", "season", "fields"],
        "required_params": [],
    }
const divisions: EndpointDefinition = {
        "url": BASE_URL + "{ver}/divisions",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["divisionId", "leagueId", "sportId"],
        "required_params": [],
        "note": "Call divisions endpoint with no parameters to return a list of divisions.",
    }
const draft: EndpointDefinition = {
        "url": BASE_URL + "{ver}/draft{prospects}{year}{latest}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "prospects": {
                "type": "bool",
                "default": false,
                "true": "/prospects",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
            "year": {
                "type": "str",
                "default": "2019",  // TODO: current year or most recent draft year
                "leading_slash": true,
                "trailing_slash": false,
                "required": true,
            },
            "latest": {
                "type": "bool",
                "default": false,
                "true": "/latest",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
        },
        "query_params": [
            "limit",
            "fields",
            "round",
            "name",
            "school",
            "state",
            "country",
            "position",
            "teamId",
            "playerId",
            "bisPlayerId",
        ],
        "required_params": [],
        "note": 'No query parameters are honored when "latest" endpoint is queried (year is still required). Prospects and Latest cannot be used together.',
    }
const game: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/feed/live",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1.1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["timecode", "hydrate", "fields"],
        "required_params": [],
    }
const game_boxscore: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/{gamePk}/boxscore",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
        "gamePk": {
            "type": "str",
            "default": "",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
    },
    "query_params": ["timecode", "fields"],
    "required_params": [],
}
const game_changes: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/changes",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        }
    },
    "query_params": ["updatedSince", "sportId", "gameType", "season", "fields"],
    "required_params": ["updatedSince"],
}
const game_color: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/{gamePk}/feed/color",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
        "gamePk": {
            "type": "str",
            "default": "",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
    },
    "query_params": ["timecode", "fields"],
    "required_params": [],
}
const game_color_diff: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/{gamePk}/feed/color/diffPatch",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
        "gamePk": {
            "type": "str",
            "default": "",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
    },
    "query_params": ["startTimecode", "endTimecode"],
    "required_params": ["startTimeCode", "endTimeCode"],
}
const game_content: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/{gamePk}/content",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
        "gamePk": {
            "type": "str",
            "default": "",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
    },
    "query_params": ["highlightLimit"],
    "required_params": [],
}
const game_contextMetrics: EndpointDefinition = {
    "url": BASE_URL + "{ver}/game/{gamePk}/contextMetrics",
    "path_params": {
        "ver": {
            "type": "str",
            "default": "v1",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
        "gamePk": {
            "type": "str",
            "default": "",
            "leading_slash": false,
            "trailing_slash": false,
            "required": true,
        },
    },
    "query_params": ["timecode", "fields"],
    "required_params": [],
}
const game_diff: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/feed/live/diffPatch",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1.1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["startTimecode", "endTimecode"],
        "required_params": ["startTimecode", "endTimecode"],
    }
const game_timestamps: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/feed/live/timestamps",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1.1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [],
        "required_params": [],
    }
const game_winProbability: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/winProbability",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["timecode", "fields"],
        "required_params": [],
        "note": "If you only want the current win probability for each team, try the game_contextMetrics endpoint instad.",
    }

const game_color_timestamps: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/feed/color/timestamps",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [],
        "required_params": [],
    }
const game_linescore: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/linescore",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["timecode", "fields"],
        "required_params": [],
    }
const game_playByPlay: EndpointDefinition = {
        "url": BASE_URL + "{ver}/game/{gamePk}/playByPlay",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["timecode", "fields"],
        "required_params": [],
    }
const gamePace: EndpointDefinition = {
        "url": BASE_URL + "{ver}/gamePace",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "season",
            "teamIds",
            "leagueIds",
            "leagueListId",
            "sportId",
            "gameType",
            "startDate",
            "endDate",
            "venueIds",
            "orgType",
            "includeChildren",
            "fields",
        ],
        "required_params": ["season"],
    }
const highLow: EndpointDefinition = {
        "url": BASE_URL + "{ver}/highLow/{orgType}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "orgType": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [
            "statGroup",
            "sortStat",
            "season",
            "gameType",
            "teamId",
            "leagueId",
            "sportIds",
            "limit",
            "fields",
        ],
        "required_params": ["sortStat", "season"],
        "note": "Valid values for orgType parameter: player, team, division, league, sport, types.",
    }
const homeRunDerby: EndpointDefinition = {
        "url": BASE_URL + "{ver}/homeRunDerby/{gamePk}{bracket}{pool}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "bracket": {
                "type": "bool",
                "default": false,
                "true": "/bracket",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
            "pool": {
                "type": "bool",
                "default": false,
                "true": "/pool",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
        },
        "query_params": ["fields"],
        "required_params": [],
    }
const league: EndpointDefinition = {
        "url": BASE_URL + "{ver}/league",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["sportId", "leagueIds", "seasons", "fields"],
        "required_params": ["sportId", "leagueIds"],
    }
const league_allStarBallot: EndpointDefinition = {
        "url": BASE_URL + "{ver}/league/{leagueId}/allStarBallot",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "leagueId": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "fields"],
        "required_params": ["season"],
    }
const league_allStarWriteIns: EndpointDefinition = {
        "url": BASE_URL + "{ver}/league/{leagueId}/allStarWriteIns",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "leagueId": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "fields"],
        "required_params": ["season"],
    }
const league_allStarFinalVote: EndpointDefinition = {
        "url": BASE_URL + "{ver}/league/{leagueId}/allStarFinalVote",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "leagueId": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "fields"],
        "required_params": ["season"],
    }
const people: EndpointDefinition = {
        "url": BASE_URL + "{ver}/people",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["personIds", "hydrate", "fields"],
        "required_params": ["personIds"],
    }
const people_changes: EndpointDefinition = {
        "url": BASE_URL + "{ver}/people/changes",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["updatedSince", "fields"],
        "required_params": [],
    }
const people_freeAgents: EndpointDefinition = {
        "url": BASE_URL + "{ver}/people/freeAgents",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "leagueId": {
                "type": "str",
                "default": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["order", "hydrate", "fields"],
        "required_params": [],
    }
const person: EndpointDefinition = {
        "url": BASE_URL + "{ver}/people/{personId}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "personId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["hydrate", "fields"],
        "required_params": [],
    }
const person_stats: EndpointDefinition = {
        "url": BASE_URL + "{ver}/people/{personId}/stats/game/{gamePk}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "personId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "gamePk": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["fields"],
        "required_params": [],
        "note": 'Specify "current" instead of a gamePk for a player\'s current game stats.',
    }
const jobs: EndpointDefinition = {
        "url": BASE_URL + "{ver}/jobs",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["jobType", "sportId", "date", "fields"],
        "required_params": [["jobType"]],
    }
    "jobs_umpires": {
        "url": BASE_URL + "{ver}/jobs/umpires",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["sportId", "date", "fields"],
        "required_params": [],
    },
const jobs_umpire_games: EndpointDefinition = {
        "url": BASE_URL + "{ver}/jobs/umpires/games/{umpireId}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "umpireId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "fields"],
        "required_params": ["season"],
    },
const jobs_datacasters: EndpointDefinition = {
        "url": BASE_URL + "{ver}/jobs/datacasters",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["sportId", "date", "fields"],
        "required_params": [],
    }
const jobs_officialScorers: EndpointDefinition = {
        "url": BASE_URL + "{ver}/jobs/officialScorers",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["timecode", "fields"],
        "required_params": [],
    }
const schedule: EndpointDefinition = {
        "url": BASE_URL + "{ver}/schedule",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "scheduleType",
            "eventTypes",
            "hydrate",
            "teamId",
            "leagueId",
            "sportId",
            "gamePk",
            "gamePks",
            "venueIds",
            "gameTypes",
            "date",
            "startDate",
            "endDate",
            "opponentId",
            "fields",
        ],
        "required_params": ["sportId", "gamePk", "gamePks"],
    }
const schedule_postseason: EndpointDefinition = {
        "url": BASE_URL + "{ver}/schedule/postseason",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "gameTypes",
            "seriesNumber",
            "teamId",
            "sportId",
            "season",
            "hydrate",
            "fields",
        ],
        "required_params": [],
    }
const schedule_postseason_series: EndpointDefinition = {
        "url": BASE_URL + "{ver}/schedule/postseason/series",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "gameTypes",
            "seriesNumber",
            "teamId",
            "sportId",
            "season",
            "fields",
        ],
        "required_params": [],
    }
const schedule_postseason_tuneIn: EndpointDefinition = {
        "url": BASE_URL + "{ver}/schedule/postseason/tuneIn",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["teamId", "sportId", "season", "hydrate", "fields"],
        "required_params": [],
        "note": "The schedule_postseason_tuneIn endpoint appears to return no data.",
    }
const schedule_tied: EndpointDefinition = {
        "url": BASE_URL + "{ver}/schedule/games/tied",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["gameTypes", "season", "hydrate", "fields"],
        "required_params": ["season"],
    }
const seasons: EndpointDefinition = {
        "url": BASE_URL + "{ver}/seasons{all}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "all": {
                "type": "bool",
                "default": false,
                "true": "/all",
                "false": "",
                "leading_slash": false,
                "trailing_slash": false,
                "required": false,
            },
        },
        "query_params": ["season", "sportId", "divisionId", "leagueId", "fields"],
        "required_params": ["sportId", "divisionId", "leagueId"],
        "note": 'Include "all" parameter with value of true to query all seasons. The divisionId and leagueId parameters are supported when "all" is used.',
    }
const season: EndpointDefinition = {
        "url": BASE_URL + "{ver}/seasons/{seasonId}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "seasonId": {
                "type": "str",
                "default": false,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["sportId", "fields"],
        "required_params": ["sportId"],
    }
const sports: EndpointDefinition = {
        "url": BASE_URL + "{ver}/sports",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["sportId", "fields"],
        "required_params": [],
    }
const sports_players: EndpointDefinition = {
        "url": BASE_URL + "{ver}/sports/{sportId}/players",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "sportId": {
                "type": "str",
                "default": "1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "gameType", "fields"],
        "required_params": ["season"],
    }
const standings: EndpointDefinition = {
        "url": BASE_URL + "{ver}/standings",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "leagueId",
            "season",
            "standingsTypes",
            "date",
            "hydrate",
            "fields",
        ],
        "required_params": ["leagueId"],
    }
const stats: EndpointDefinition = {
        "url": BASE_URL + "{ver}/stats",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "stats",
            "playerPool",
            "position",
            "teamId",
            "leagueId",
            "limit",
            "offset",
            "group",
            "gameType",
            "season",
            "sportIds",
            "sortStat",
            "order",
            "hydrate",
            "fields",
            "personId",
            "metrics",
        ],
        "required_params": ["stats", "group"],
        "note": "If no limit is specified, the response will be limited to 50 records.",
    }
const stats_leaders: EndpointDefinition = {
        "url": BASE_URL + "{ver}/stats/leaders",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "leaderCategories",
            "playerPool",
            "leaderGameTypes",
            "statGroup",
            "season",
            "leagueId",
            "sportId",
            "hydrate",
            "limit",
            "fields",
            "statType",
        ],
        "required_params": ["leaderCategories"],
        "note": "If excluding season parameter to get all time leaders, include statType=statsSingleSeason or you will likely not get any results.",
    }
const stats_streaks: EndpointDefinition  = {
        "url": BASE_URL + "{ver}/stats/streaks",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "streakType",
            "streakSpan",
            "gameType",
            "season",
            "sportId",
            "limit",
            "hydrate",
            "fields",
        ],
        "required_params": ["streakType", "streakSpan", "season", "sportId", "limit"],
        "note": 'Valid streakType values: "hittingStreakOverall" "hittingStreakHome" "hittingStreakAway" "onBaseOverall" "onBaseHome" "onBaseAway". Valid streakSpan values: "career" "season" "currentStreak" "currentStreakInSeason" "notable" "notableInSeason".',
    }
const team: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "sportId", "hydrate", "fields"],
        "required_params": [],
    }
const team_alumni: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/alumni",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "group", "hydrate", "fields"],
        "required_params": ["season", "group"],
    }
const team_coaches: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/coaches",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["season", "date", "fields"],
        "required_params": [],
    }
const team_leaders: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/leaders",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [
            "leaderCategories",
            "season",
            "leaderGameTypes",
            "hydrate",
            "limit",
            "fields",
        ],
        "required_params": ["leaderCategories", "season"],
    }
const team_personnel: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/personnel",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["date", "fields"],
        "required_params": [],
    }
const team_roster: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/roster",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": ["rosterType", "season", "date", "hydrate", "fields"],
        "required_params": [],
    }
const team_stats: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/{teamId}/stats",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "teamId": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [
            "season",
            "group",
            "gameType",
            "stats",
            "sportIds",
            "sitCodes",
            "fields",
        ],
        "required_params": ["season", "group"],
        "note": "Use meta('statGroups') to look up valid values for group, meta('statTypes') for valid values for stats, and meta('situationCodes') for valid values for sitCodes. Use sitCodes with stats=statSplits.",
    }
const teams: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "season",
            "activeStatus",
            "leagueIds",
            "sportId",
            "sportIds",
            "gameType",
            "hydrate",
            "fields",
        ],
        "required_params": [],
    }
const teams_history: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/history",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["teamIds", "startSeason", "endSeason", "fields"],
        "required_params": ["teamIds"],
    }
const teams_stats: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/stats",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "season",
            "sportIds",
            "group",
            "gameType",
            "stats",
            "order",
            "sortStat",
            "fields",
            "startDate",
            "endDate",
        ],
        "required_params": ["season", "group", "stats"],
        "note": "Use meta('statGroups') to look up valid values for group, and meta('statTypes') for valid values for stats.",
    }
const teams_affiliates: EndpointDefinition = {
        "url": BASE_URL + "{ver}/teams/affiliates",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["teamIds", "sportId", "season", "hydrate", "fields"],
        "required_params": ["teamIds"],
    }
const transactions: EndpointDefinition = {
        "url": BASE_URL + "{ver}/transactions",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": [
            "teamId",
            "playerId",
            "date",
            "startDate",
            "endDate",
            "sportId",
            "fields",
        ],
        "required_params": [
            "teamId",
            "playerId",
            "date",
            "startDate", "endDate",
        ],
    }
const venue: EndpointDefinition = {
        "url": BASE_URL + "{ver}/venues",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            }
        },
        "query_params": ["venueIds", "season", "hydrate", "fields"],
        "required_params": ["venueIds"],
    }
const meta: EndpointDefinition = {
        "url": BASE_URL + "{ver}/{type}",
        "path_params": {
            "ver": {
                "type": "str",
                "default": "v1",
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
            "type": {
                "type": "str",
                "default": null,
                "leading_slash": false,
                "trailing_slash": false,
                "required": true,
            },
        },
        "query_params": [],
        "required_params": [],
        "note": "The meta endpoint is used to retrieve values to be used within other API calls. Available types: awards, baseballStats, eventTypes, gameStatus, gameTypes, hitTrajectories, jobTypes, languages, leagueLeaderTypes, logicalEvents, metrics, pitchCodes, pitchTypes, platforms, positions, reviewReasons, rosterTypes, scheduleEventTypes, situationCodes, sky, standingsTypes, statGroups, statTypes, windDirection.",
    }
    // v1/analytics - requires authentication
    // v1/game/{gamePk}/guids - statcast data - requires authentication

export const ENDPOINTS: Record<string, EndpointDefinition> = { attendance, awards, conferences, divisions, draft, game, game_boxscore, game_changes, game_color, game_color_diff, game_content, game_contextMetrics, game_diff, game_timestamps, game_winProbability,
    game_color_timestamps, game_linescore, game_playByPlay, gamePace, highLow, homeRunDerby, league, league_allStarBallot, league_allStarWriteIns, league_allStarFinalVote,
    people, people_changes, people_freeAgents, person, person_stats, jobs, jobs_umpire_games, jobs_datacasters, jobs_officialScorers,
    schedule, schedule_postseason, schedule_postseason_series, schedule_postseason_tuneIn, schedule_tied, seasons, season, sports, sports_players, standings, stats, stats_leaders, stats_streaks,
    team, team_alumni, team_coaches, team_leaders, team_personnel, team_roster, team_stats, teams, teams_history, teams_stats, teams_affiliates, transactions, venue, meta
} 