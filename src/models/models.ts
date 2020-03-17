export interface HubMatches extends ArrayResponse<HubMatchesItem> { }

export interface HubMatchesItem {
    match_id:         string;
    version:          number;
    game:             GameId;
    region:           Region;
    competition_id:   string;
    competition_type: CompetitionType;
    competition_name: string;
    organizer_id:     string;
    teams:            PurpleTeams;
    calculate_elo:    boolean;
    chat_room_id:     string;
    best_of:          number;
    status:           PurpleStatus;
    faceit_url:       string;
    finished_at?:     number;
    voting?:          Voting;
    configured_at?:   number;
    started_at?:      number;
    results?:         Results;
    demo_url?:        string[];
}

export enum CompetitionType {
    Hub = "hub",
}

export enum GameId {
    Csgo = "csgo",
    Tf2 = "tf2",
    RlXboxPc = "rl_XBOX_PC",
    Csco = "csco",
    Insidia = "insidia",
    LolEUW = "lol_EUW",
    LolEUN = "lol_EUN",
    LolNA = "lol_NA",
    QuakeLive = "quakelive",
    StarCraft2EU = "starcraft2_EU",
    WotEU = "wot_EU",
    WotXbox = "wot_xbox",
    StarCraft2US = "starcraft2_US",
    WotNA = "wot_NA",
    WotRU = "wot_RU",
    Smite = "smite",
    SmiteXbox = "smite_xbox",
    Rainbow6 = "rainbow_6",
    Dirtybomb = "dirtybomb",
    Warface = "warface",
    Csdz = "csdz",
    Nhl19Xbox = "nhl_19_XBOX",
    Nhl19PS4 = "nhl_19_PS4",
    Apex = "apex",
    RocketLeague = "rocket_league",
    MagicArena = "magic_arena",
    Pubg = "pubg",
    ClashRoyale = "clash_royale",
    BrawlStars = "brawl_stars",
    Hearthstone = "hearthstone",
    QuakeChampions = "quake_champions",
    GsCsgo = "gs_csgo",
    Battalion = "battalion",
    Fifa20 = "fifa20",
    MinionMasters = "minion_masters",
    Nhl18Xbox = "nhl_18_XBOX",
    Nhl18PS4 = "nhl_18_PS4",
    Halo3 = "halo_3",
    OverwatchUS = "overwatch_US",
    OverwatchEU = "overwatch_EU",
    Destiny2PS4 = "destiny2_ps4",
    Destiny2Xbox = "destiny2_xbox",
    RingOfTheElysium = "ring_of_elysium",
    Dota2 = "dota2",
    Destiny2 = "destiny2",
    Nhl20Xbox = "nhl_20_xbox",
    Nhl20PS4 = "nhl_20_ps4",
    GsWotEU = "gs_wot_EU",
    GsPubg = "gs_pubg",
    Wot = "wot",
    Lol = "lol",
    Nhl19 = "nhl_19",
    OverwatchKR = "overwatch_KR",
    Overwatch = "overwatch",
    Destiny2Parent = "destiny2_parent",
    WarfaceParent = "warface_parent",
    Nhl20Parent = "nhl_20_parent",
}
export enum MembershipType {
    Free = "free",
    Premium = "premium",
    Unlimited = "unlimited",
}

export enum Region {
    Eu = "EU",
    Us = "US",
    Ru = "RU",
    Oceania = "Oceania",
    Sea = "SEA",
    Sa = "SA"
}

export interface Results {
    winner: Winner;
    score:  Score;
}

export interface Score {
    faction1?: number;
    faction2?: number;
}

export enum Winner {
    Empty = "",
    Faction1 = "faction1",
    Faction2 = "faction2",
}

export enum PurpleStatus {
    Cancelled = "CANCELLED",
    Finished = "FINISHED",
    Ongoing = "ONGOING",
    Ready = "READY",
    Voting = "VOTING",
}

export interface PurpleTeams {
    faction1: PurpleFaction;
    faction2: PurpleFaction;
}

export interface PurpleFaction {
    faction_id:  string;
    leader:      string;
    avatar:      string;
    roster:      Roster[];
    substituted: boolean;
    name:        string;
    type:        string;
}

export interface Roster {
    player_id:          string;
    nickname:           string;
    avatar:             string;
    membership:         MembershipType;
    game_player_id:     string;
    game_player_name:   string;
    game_skill_level:   number;
    anticheat_required: boolean;
}

export interface Voting {
    voted_entity_types: VotedEntityType[];
    location:           Location;
    map:                MapClass;
}

export interface Location {
    entities: LocationEntity[];
    pick:     Pick[];
}

export interface LocationEntity {
    name:             Pick;
    className:        Pick;
    game_location_id: Pick;
    guid:             Pick;
    image_lg:         string;
    image_sm:         string;
}

export enum Pick {
    France = "France",
    Germany = "Germany",
    Netherlands = "Netherlands",
}

export interface MapClass {
    entities: MapEntity[];
    pick:     MapElement[];
}

export interface MapEntity {
    image_sm:    string;
    name:        MapElement;
    class_name:  MapElement;
    game_map_id: MapElement;
    guid:        MapElement;
    image_lg:    string;
}

export enum MapElement {
    DeCache = "de_cache",
    DeDust2 = "de_dust2",
    DeInferno = "de_inferno",
    DeMirage = "de_mirage",
    DeNuke = "de_nuke",
    DeOverpass = "de_overpass",
    DeTrain = "de_train",
    DeVertigo = "de_vertigo",
}

export enum VotedEntityType {
    Location = "location",
    Map = "map",
}

export interface Hub {
    hub_id:           string;
    name:             string;
    avatar:           string;
    cover_image:      string;
    background_image: string;
    game_id:          GameId;
    region:           Region;
    description:      string;
    chat_room_id:     string;
    organizer_id:     string;
    rule_id:          string;
    players_joined:   number;
    min_skill_level:  number;
    max_skill_level:  number;
    join_permission:  string;
    faceit_url:       string;
    game_data?:       GameData;
    organizer_data?:  OrganizerData;
}

export interface GameData {
    game_id:        GameId;
    short_label:    string;
    long_label:     string;
    assets:         Assets;
    platforms:      string[];
    regions:        string[];
    parent_game_id: string;
    order:          number;
}

export interface Assets {
    cover:          string;
    flag_img_icon:  string;
    flag_img_s:     string;
    flag_img_m:     string;
    flag_img_l:     string;
    featured_img_s: string;
    featured_img_m: string;
    featured_img_l: string;
    landing_page:   string;
}

export interface OrganizerData {
    organizer_id: string;
    avatar:       string;
    cover:        string;
    name:         string;
    description:  string;
    type:         string;
    facebook:     string;
    youtube:      string;
    twitter:      string;
    twitch:       string;
    vk:           string;
    website:      string;
    faceit_url:   string;
}

export interface MatchStats {
    rounds: Round[];
}

export interface Round {
    best_of:        string;
    competition_id: null;
    game_id:        GameId;
    game_mode:      GameMode;
    match_id:       string;
    match_round:    string;
    played:         string;
    round_stats:    RoundStats;
    teams:          Team[];
}

export enum GameMode {
    Csgo5V5 = "csgo 5v5",
    The5V5 = "5v5",
}

export interface RoundStats {
    Region: Region;
    Map:    MapElement;
    Rounds: string;
    Score:  string;
    Winner: string;
}

export interface Team {
    team_id:    string;
    premade:    boolean;
    team_stats: TeamStats;
    players:    TeamPlayer[];
}

export interface TeamPlayer {
    player_id:    string;
    nickname:     string;
    player_stats: PlayerStatsClass;
}

export interface PlayerStatsClass {
    MVPs:           string;
    "Quadro Kills": string;
    "Triple Kills": string;
    "K/R Ratio":    string;
    Result:         string;
    "K/D Ratio":    string;
    "Headshots %":  string;
    Headshot:       string;
    "Penta Kills":  string;
    Kills:          string;
    Deaths:         string;
    Assists:        string;
}

export interface TeamStats {
    "Team Win":          string;
    "Team Headshot":     string;
    "Final Score":       string;
    "Second Half Score": string;
    Team:                string;
    "First Half Score":  string;
    "Overtime score":    string;
}

export interface Rankings extends ArrayResponse<RankingPlayerPositionItem> {
    position?: number;
}

export interface RankingPlayerPositionItem {
    player_id:        string;
    nickname:         string;
    country:          string;
    position:         number;
    faceit_elo:       number;
    game_skill_level: number;
}

export interface Tournament extends ArrayResponse<TournamentsItem> { }

export interface TournamentsItem {
    tournament_id:                  string;
    name:                           string;
    featured_image:                 string;
    game_id:                        GameId;
    region:                         Region;
    status:                         FluffyStatus;
    custom:                         boolean;
    invite_type:                    InviteType;
    prize_type:                     PrizeType;
    total_prize:                    string;
    team_size:                      number;
    min_skill:                      number;
    max_skill:                      number;
    match_type:                     GameMode;
    organizer_id:                   string;
    whitelist_countries:            string[];
    membership_type:                MembershipType;
    number_of_players:              number;
    number_of_players_joined:       number;
    number_of_players_checkedin:    number;
    number_of_players_participants: number;
    anticheat_required:             boolean;
    started_at:                     number;
    subscriptions_count:            number;
    faceit_url:                     string;
}

export enum InviteType {
    Empty = "",
    Public = "public",
}

export enum PrizeType {
    Points = "points",
}

export enum FluffyStatus {
    Paid = "paid",
}

export interface Match extends ArrayResponse<MatchItem> {
    from:  number;
    to:    number;
}

export interface MatchItem {
    match_id:         string;
    game_id:          GameId;
    region:           Region;
    match_type:       string;
    game_mode:        GameMode;
    max_players:      number;
    teams_size:       number;
    teams:            FluffyTeams;
    playing_players:  string[];
    competition_id:   string;
    competition_name: string;
    competition_type: string;
    organizer_id:     string;
    status:           string;
    started_at:       number;
    finished_at:      number;
    results:          Results;
    faceit_url:       string;
}

export interface FluffyTeams {
    faction1: FluffyFaction;
    faction2: FluffyFaction;
}

export interface FluffyFaction {
    team_id:  string;
    nickname: string;
    avatar:   string;
    type:     string;
    players:  FactionPlayer[];
}

export interface FactionPlayer {
    player_id:        string;
    nickname:         string;
    avatar:           string;
    skill_level:      number;
    game_player_id:   string;
    game_player_name: string;
    faceit_url:       string;
}

export interface PlayerHub extends ArrayResponse<PlayerHubItem> { }

export interface PlayerHubItem {
    hub_id:       string;
    name:         string;
    avatar:       string;
    game_id:      string;
    organizer_id: string;
    faceit_url:   string;
}

export interface PlayerStats {
    player_id: string;
    game_id:   GameId;
    lifetime:  Lifetime;
    segments:  Segment[];
}

export interface Lifetime {
    "Longest Win Streak":  string;
    Wins:                  string;
    "Total Headshots %":   string;
    "Recent Results":      string[];
    "Win Rate %":          string;
    "Average Headshots %": string;
    "Current Win Streak":  string;
    "K/D Ratio":           string;
    "Average K/D Ratio":   string;
    Matches:               string;
}

export interface Segment {
    img_small:   string;
    img_regular: string;
    stats:       Stats;
    type:        Type;
    mode:        Mode;
    label:       string;
}

export enum Mode {
    The1V1 = "1v1",
    The5V5 = "5v5",
}

export interface Stats {
    "Triple Kills":         string;
    Headshots:              string;
    "Average MVPs":         string;
    "Average Headshots %":  string;
    Deaths:                 string;
    "Average Penta Kills":  string;
    Matches:                string;
    Wins:                   string;
    Assists:                string;
    "Average Assists":      string;
    "K/D Ratio":            string;
    "Average Kills":        string;
    Kills:                  string;
    MVPs:                   string;
    "Headshots per Match":  string;
    "K/R Ratio":            string;
    "Average Deaths":       string;
    "Average K/R Ratio":    string;
    Rounds:                 string;
    "Average K/D Ratio":    string;
    "Win Rate %":           string;
    "Quadro Kills":         string;
    "Total Headshots %":    string;
    "Average Quadro Kills": string;
    "Penta Kills":          string;
    "Average Triple Kills": string;
}

export enum Type {
    Map = "Map",
}

export interface Player {
    player_id:            string;
    nickname:             string;
    avatar:               string;
    country:              string;
    cover_image:          string;
    cover_featured_image: string;
    infractions:          Infractions;
    platforms:            Platforms;
    games:                GamesClass;
    settings:             Settings;
    friends_ids:          string[];
    bans:                 any[];
    new_steam_id:         string;
    steam_id_64:          string;
    steam_nickname:       string;
    membership_type:      MembershipType;
    memberships:          MembershipType[];
    faceit_url:           string;
}

export interface GamesClass {
    csco: Game;
    pubg: Game;
    csgo: Game;
}

export interface Game {
    game_profile_id:   string;
    region:            Region;
    regions:           Regions | null;
    skill_level_label: string;
    game_player_id:    string;
    skill_level:       number;
    faceit_elo:        number;
    game_player_name:  string;
}

export interface Regions {
    EU: Eu;
}

export interface Eu {
    selected_ladder_id: string;
}

export interface Infractions {
    last_infraction_date: string;
    afk:                  number;
    leaver:               number;
    qm_not_checkedin:     number;
    qm_not_voted:         number;
}

export interface Platforms {
    steam: string;
}

export interface Settings {
    language: string;
}

export interface Games extends ArrayResponse<GameData> { }

export interface ArrayResponse<T> {
    items: T[];
    start: number;
    end: number;
}
