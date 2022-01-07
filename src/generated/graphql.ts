import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A geojson feature */
  GeoJsonFeature: any;
  /** A geojson featurecollection */
  GeoJsonFeatureCollection: any;
  /** Long type */
  Long: any;
};

export type ApiPortProperty = ResourceDto & {
  __typename?: 'APIPortProperty';
  booleanValue?: Maybe<Scalars['Boolean']>;
  doubleValue?: Maybe<Scalars['Float']>;
  integerValue?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  longValue?: Maybe<Scalars['Long']>;
  propertyName?: Maybe<PropertyName>;
  resourceType?: Maybe<Scalars['String']>;
  stringValue?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  AcceptEntityDTO represents the event of a device being accepted in the system. */
export type AcceptEntityDto = ResourceDto & {
  __typename?: 'AcceptEntityDTO';
  acceptingUserid?: Maybe<Scalars['String']>;
  did?: Maybe<Scalars['String']>;
  gatewayDid?: Maybe<Scalars['String']>;
  inetAddr?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  locationId?: Maybe<Scalars['String']>;
  macAddr?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  state?: Maybe<DeviceAcceptState>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeFirstSeen?: Maybe<Scalars['Long']>;
  timeWhenAccepted?: Maybe<Scalars['Long']>;
};

/**
 *  Contains the information that define all possible states when discovering, accepting or removing
 *  a device from a system.
 */
export enum AcceptState {
  Accepted = 'accepted',
  Accepting = 'accepting',
  Blocked = 'blocked',
  Discovered = 'discovered',
  Failed = 'failed',
  Removed = 'removed'
}

/**
 *  AccountDTO object holds all information that can describe a Yanzi Account. It contains the
 *  account number, the account name, the owner name and the time that is was last modified.
 */
export type AccountDto = ResourceDto & {
  __typename?: 'AccountDTO';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  domainId?: Maybe<Scalars['String']>;
  domainParentAccount?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  owner?: Maybe<Scalars['String']>;
  prospect?: Maybe<PlanDto>;
  prospects: Array<PlanDto>;
  resourceType?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<AccountUserRole>>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
};


/**
 *  AccountDTO object holds all information that can describe a Yanzi Account. It contains the
 *  account number, the account name, the owner name and the time that is was last modified.
 */
export type AccountDtoProspectArgs = {
  id: Scalars['String'];
};

export type AccountMutation = {
  __typename?: 'AccountMutation';
  /**
   * null
   * Requires user role: admin
   */
  addUser: AccountDto;
  /**
   * null
   * Requires user role: manager
   */
  createProspect?: Maybe<PlanDto>;
  prospect?: Maybe<ProspectMutation>;
  /**
   * null
   * Requires user role: admin
   */
  removeAccount: Scalars['Boolean'];
  /**
   * null
   * Requires user role: admin
   */
  removeUser?: Maybe<AccountDto>;
  /**
   *  Set the domain on this account. You must be the owner of the account and have a user connected to the target domain.
   *  When a domain is set, only users with that domain may be added.
   *  Set domainId: null to remove the restriction.
   * Requires user role: admin
   */
  setDomain: AccountDto;
  /**
   * null
   * Requires user role: admin
   */
  setProperty: AccountDto;
};


export type AccountMutationAddUserArgs = {
  role: SystemUserAcl;
  user: Scalars['String'];
};


export type AccountMutationCreateProspectArgs = {
  name: Scalars['String'];
};


export type AccountMutationProspectArgs = {
  id: Scalars['String'];
};


export type AccountMutationRemoveUserArgs = {
  user: Scalars['String'];
};


export type AccountMutationSetDomainArgs = {
  domainId?: InputMaybe<Scalars['String']>;
};


export type AccountMutationSetPropertyArgs = {
  name: PropertyName;
  value: Scalars['String'];
};

/**  Contains an Id of a user and a SystemUserAcl for the user with that Id. */
export type AccountUserRole = ResourceDto & {
  __typename?: 'AccountUserRole';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  roleName?: Maybe<Scalars['String']>;
  systemUserAcl?: Maybe<SystemUserAcl>;
  timeCreated?: Maybe<Scalars['Long']>;
  userId?: Maybe<Scalars['String']>;
};

/**
 *  Not available yet! - CopDTO object holds all information that describe a Yanzi Master Server. It
 *  contains the cop number, the cop IP address, the time it was last modified.
 */
export type AdministrativeDomainDto = ResourceDto & {
  __typename?: 'AdministrativeDomainDTO';
  description?: Maybe<Scalars['String']>;
  domainId?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  realmId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
  topAccountId?: Maybe<Scalars['String']>;
};

/**  From the ontology, an asset candidate is born */
export type AssetCandidate = {
  __typename?: 'AssetCandidate';
  /**  Calculate the area. Is negative if the geometry cannot have an area. */
  area: Scalars['Float'];
  bbox?: Maybe<Array<Scalars['Float']>>;
  center?: Maybe<Array<Scalars['Float']>>;
  children: Array<AssetCandidate>;
  geoJSONType?: Maybe<Scalars['String']>;
  geojson?: Maybe<Scalars['GeoJsonFeature']>;
  id: Scalars['ID'];
  parents: Array<AssetCandidate>;
  properties: Array<CustomPropertyDto>;
  type: UnitType;
  unit?: Maybe<UnitDto>;
};

/**
 *  Contains all different states that an asset can be at. Not all states are applicable for all
 *  assets. For example a chair can be either free, occupied or missingInput.
 */
export enum AssetState {
  AlmostEmpty = 'almostEmpty',
  AlmostFull = 'almostFull',
  ArmAfterInit = 'armAfterInit',
  Armed = 'armed',
  Breached = 'breached',
  Closed = 'closed',
  ConnectionInstable = 'connectionInstable',
  Disabled = 'disabled',
  Empty = 'empty',
  Error = 'error',
  Free = 'free',
  Full = 'full',
  Init = 'init',
  IsMotion = 'isMotion',
  IsNoMotion = 'isNoMotion',
  Maintenance = 'maintenance',
  MissingInput = 'missingInput',
  NeedService = 'needService',
  Notify = 'notify',
  Occupied = 'occupied',
  Ok = 'ok',
  Open = 'open',
  Operational = 'operational',
  Present = 'present',
  Shadow = 'shadow',
  Test = 'test',
  Trigged = 'trigged'
}

export type AuthenticateInput = {
  customProperties?: InputMaybe<Array<PropertyInput>>;
  did: Scalars['String'];
  planningId?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<PositionInput>;
  properties?: InputMaybe<Array<NamedPropertyInput>>;
  vid?: InputMaybe<Scalars['String']>;
};

export type AuthenticationServer = ResourceDto & {
  __typename?: 'AuthenticationServer';
  description?: Maybe<Scalars['String']>;
  dnsName?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type BatteryPowerDefinition = ResourceDto & {
  __typename?: 'BatteryPowerDefinition';
  key?: Maybe<Scalars['ID']>;
  list?: Maybe<Array<BucketConsumption>>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum BinaryMessageType {
  PlatformManager = 'PLATFORM_MANAGER',
  TunnelEndpoint = 'TUNNEL_ENDPOINT',
  Cborcmd = 'cborcmd',
  Encap = 'encap',
  IdBuffer = 'idBuffer',
  Iotmeshpacket = 'iotmeshpacket',
  Link = 'link',
  Undefined = 'undefined',
  Unused = 'unused',
  Video = 'video'
}

export type BinaryWrapperDto = ResourceDto & {
  __typename?: 'BinaryWrapperDTO';
  id?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type BlobDto = ResourceDto & {
  __typename?: 'BlobDTO';
  data?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
};

export type Booking = ResourceDto & {
  __typename?: 'Booking';
  key?: Maybe<Scalars['ID']>;
  range?: Maybe<Range>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  userId?: Maybe<Scalars['String']>;
};

export type BucketConsumption = ResourceDto & {
  __typename?: 'BucketConsumption';
  bucketType?: Maybe<BucketType>;
  consumption?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum BucketType {
  DeepSleep = 'DeepSleep',
  Processor = 'Processor',
  Receiver = 'Receiver',
  Transmitter = 'Transmitter'
}

export type Capability = {
  __typename?: 'Capability';
  function: Function;
  version: Scalars['Int'];
};

export type ClientInfoDto = ResourceDto & {
  __typename?: 'ClientInfoDTO';
  key?: Maybe<Scalars['ID']>;
  os?: Maybe<Scalars['String']>;
  osVersion?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
};

export type ClientUserInfoDto = ResourceDto & {
  __typename?: 'ClientUserInfoDTO';
  key?: Maybe<Scalars['ID']>;
  language?: Maybe<Language>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  ResourceDTO for executing commands over Cirrus.
 *  Contains a CommandName and optionally a list of arguments
 */
export type CommandDto = ResourceDto & {
  __typename?: 'CommandDTO';
  argumentList?: Maybe<Array<Scalars['String']>>;
  commandName?: Maybe<CommandName>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum CommandName {
  Deletedb = 'deletedb',
  FactoryDefault = 'factoryDefault',
  Hide = 'hide',
  LockOwner = 'lockOwner',
  Reboot = 'reboot',
  RequestRadioScan = 'requestRadioScan',
  RequestStatistics = 'requestStatistics',
  Revoke = 'revoke',
  Unhide = 'unhide'
}

/**
 *  Not available yet! - CopDTO object holds all information that describe a Yanzi Master Server. It
 *  contains the cop number, the cop IP address, the time it was last modified.
 */
export type CopDto = ResourceDto & {
  __typename?: 'CopDTO';
  copIp?: Maybe<Scalars['String']>;
  copname?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
};

export type CreateUnitInput = {
  customPropertyList?: InputMaybe<Array<PropertyInput>>;
  list: Array<NamedPropertyInput>;
  unitType: UnitType;
};

/**
 *  Object defining a CustomProperty. The name is an arbitrary
 *  string and the value is a Base64 encoded string
 */
export type CustomPropertyDto = ResourceDto & {
  __typename?: 'CustomPropertyDTO';
  key?: Maybe<Scalars['ID']>;
  propertyName?: Maybe<Scalars['String']>;
  propertyValue?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  DataSourceAddress object is used to uniquely identify a source of samples. */
export type DataSourceAddress = ResourceDto & {
  __typename?: 'DataSourceAddress';
  did?: Maybe<Scalars['String']>;
  instanceName?: Maybe<Scalars['String']>;
  instanceNumber?: Maybe<Scalars['Int']>;
  isSlotted: Scalars['Boolean'];
  key?: Maybe<Scalars['ID']>;
  /**  Get the latest sample for VariableName. if not set, get the default sample. */
  latest?: Maybe<Sample>;
  locationAddressKey?: Maybe<Scalars['String']>;
  locationId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  /**  Get samples for this data source. */
  samples?: Maybe<SampleList>;
  serverDid?: Maybe<Scalars['String']>;
  siUnit?: Maybe<SiUnit>;
  /**  Get slots for this data source. */
  slots?: Maybe<Array<SlotDto>>;
  timeCreated?: Maybe<Scalars['Long']>;
  unitAddressKey?: Maybe<Scalars['String']>;
  valueTypes?: Maybe<Array<ValueTypeDto>>;
  variableName?: Maybe<VariableName>;
};


/**  DataSourceAddress object is used to uniquely identify a source of samples. */
export type DataSourceAddressSamplesArgs = {
  timeSerieSelection: TimeSerieSelectionInput;
};


/**  DataSourceAddress object is used to uniquely identify a source of samples. */
export type DataSourceAddressSlotsArgs = {
  timeSerieSelection: TimeSerieSelectionInput;
};

/**
 *  DataSourceDTO is used to uniquely identify a DataSource. DataSourceDTO object holds all
 *  information that describe a data source. For example, the temp and the humidity sensors are two
 *  datasources that exist in a Yanzi Climate device. It contains a DataSource object, the SI Unit it
 *  is measured with and the time of generation.
 */
export type DataSourceDto = ResourceDto & {
  __typename?: 'DataSourceDTO';
  dataSourceAddress?: Maybe<DataSourceAddress>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  siUnit?: Maybe<SiUnit>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  Contains sample translation information. Used in TimeSerieSelection to request a transformed stream. */
export enum DataTransformation {
  None = 'none',
  Points = 'points',
  PointsChange = 'pointsChange',
  PointsTransition = 'pointsTransition'
}

export enum DeployState {
  Blocked = 'blocked',
  BlockedUnprovisioned = 'blockedUnprovisioned',
  Deleted = 'deleted',
  Discovered = 'discovered',
  Provisioned = 'provisioned',
  ToBeProvsioned = 'toBeProvsioned',
  ToBeUnprovisioned = 'toBeUnprovisioned',
  Untrusted = 'untrusted'
}

/**
 *  The DeviceAcceptState is used to describe physical things that are not currently managed by our
 *  system and only limited information about them may be available. The accept state is also used to
 *  show more detailed authentication status for things we don't trust.
 */
export enum DeviceAcceptState {
  Accepted = 'accepted',
  Accepting = 'accepting',
  Blocked = 'blocked',
  Discovered = 'discovered',
  Failed = 'failed',
  Removed = 'removed'
}

/**  Contains all the states a device may be in to. */
export enum DeviceUpState {
  Down = 'down',
  EstimatedGoingDownByGoingUp = 'estimatedGoingDownByGoingUp',
  GoingDown = 'goingDown',
  GoingUp = 'goingUp',
  Unknown = 'unknown',
  Up = 'up'
}

export enum DrainingState {
  IsDraining = 'isDraining',
  IsNotDraining = 'isNotDraining'
}

export type ElectricalPhaseDto = ResourceDto & {
  __typename?: 'ElectricalPhaseDTO';
  current?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['ID']>;
  power?: Maybe<Scalars['Float']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  voltage?: Maybe<Scalars['Float']>;
};

export type Envelope = {
  x1: Scalars['Float'];
  x2: Scalars['Float'];
  y1: Scalars['Float'];
  y2: Scalars['Float'];
};

/**
 *  EventDTO object holds all information that describe an event. For example, an event occurs when a
 *  new device is accepted in a system. The type of the event is mentioned in the EventType property.
 *  It contains a UnitAddress object, the time the event occured and a list of DTO objects.
 */
export type EventDto = ResourceDto & {
  __typename?: 'EventDTO';
  eventType?: Maybe<EventType>;
  isEmpty?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  list?: Maybe<Array<ResourceDto>>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeOfEvent?: Maybe<Scalars['Long']>;
  unitAddress?: Maybe<UnitAddress>;
};

/**
 *  Contains all different types of events that can occur in a system. These types are included in
 *  the EventDTO message that is pushed to all connected clients.
 */
export enum EventType {
  AccountChanged = 'accountChanged',
  LinkServerConnectionIsNowDown = 'linkServerConnectionIsNowDOWN',
  LinkServerConnectionIsNowUp = 'linkServerConnectionIsNowUP',
  LocationChanged = 'locationChanged',
  NewUnAcceptedDeviceAcceptFailed = 'newUnAcceptedDeviceAcceptFailed',
  NewUnAcceptedDeviceAccepted = 'newUnAcceptedDeviceAccepted',
  NewUnAcceptedDeviceAccepting = 'newUnAcceptedDeviceAccepting',
  NewUnAcceptedDeviceSeenByDiscovery = 'newUnAcceptedDeviceSeenByDiscovery',
  PhysicalDeviceBlocked = 'physicalDeviceBlocked',
  PhysicalDeviceCreated = 'physicalDeviceCreated',
  PhysicalDeviceDeleted = 'physicalDeviceDeleted',
  PhysicalDeviceFactoryDefault = 'physicalDeviceFactoryDefault',
  PhysicalDeviceFactoryDefaultRequested = 'physicalDeviceFactoryDefaultRequested',
  PhysicalDeviceFactoryDefaultSuccess = 'physicalDeviceFactoryDefaultSuccess',
  PhysicalDeviceFirstData = 'physicalDeviceFirstData',
  PhysicalDeviceIsNowDown = 'physicalDeviceIsNowDOWN',
  PhysicalDeviceIsNowUp = 'physicalDeviceIsNowUP',
  PhysicalDevicePowerSupplyBatteryLow = 'physicalDevicePowerSupplyBatteryLow',
  PhysicalDevicePowerSupplyIsNowBattery = 'physicalDevicePowerSupplyIsNowBattery',
  PhysicalDevicePowerSupplyIsNowGrid = 'physicalDevicePowerSupplyIsNowGrid',
  PhysicalDevicePowerSupplyIsNowUps = 'physicalDevicePowerSupplyIsNowUPS',
  PhysicalDeviceRebootDetected = 'physicalDeviceRebootDetected',
  PhysicalDeviceRebooted = 'physicalDeviceRebooted',
  PhysicalDeviceRevoked = 'physicalDeviceRevoked',
  RemoteLocationGatewayIsNowDown = 'remoteLocationGatewayIsNowDOWN',
  RemoteLocationGatewayIsNowUp = 'remoteLocationGatewayIsNowUP',
  RemoteLocationGatewayPeered = 'remoteLocationGatewayPeered',
  SubscriptionExpiredByTime = 'subscriptionExpiredByTime',
  UnitAlarmStateChanged = 'unitAlarmStateChanged',
  UnitConfigurationChanged = 'unitConfigurationChanged',
  UserAdded = 'userAdded',
  UserChanged = 'userChanged',
  UserNotificationSent = 'userNotificationSent',
  UserRemoved = 'userRemoved',
  UserSessionCreated = 'userSessionCreated',
  UserSessionDeleted = 'userSessionDeleted',
  VirtualDeviceCreated = 'virtualDeviceCreated',
  VirtualDeviceDeactivated = 'virtualDeviceDeactivated',
  VirtualDeviceDeleted = 'virtualDeviceDeleted'
}

/**  Used in FactoryDefault message to indicate the type of the device the message is referring to. */
export enum FactoryDefaultType {
  AllDevices = 'allDevices',
  Device = 'device',
  Gateway = 'gateway'
}

export type Floor = {
  __typename?: 'Floor';
  level: Scalars['Int'];
  name: Scalars['String'];
};

export type FloorStatus = {
  __typename?: 'FloorStatus';
  counts: StateCounts;
  errors: Array<ProvisioningDto>;
  floorLevel: Scalars['Int'];
};

/**  Warnings indexed by floor. */
export type FloorWarnings = {
  __typename?: 'FloorWarnings';
  floor: Scalars['Int'];
  warnings: Array<Warning>;
};

export enum Function {
  BurglarAlarm = 'burglarAlarm',
  CompressTransferEncode = 'compressTransferEncode',
  GraphQl = 'graphQL',
  Notifications = 'notifications',
  Threshold = 'threshold',
  Video = 'video',
  Wifi = 'wifi'
}

export enum GatewayType {
  Cop = 'cop',
  LocalFiona = 'localFiona',
  LocalLinkServer = 'localLinkServer',
  RemoteFiona = 'remoteFiona',
  Shrek = 'shrek'
}

export type Health = {
  __typename?: 'Health';
  list: Array<HealthStatus>;
  status: Severity;
};

export type HealthStatus = {
  __typename?: 'HealthStatus';
  capabilities?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  message: Scalars['String'];
  properties: Array<CustomPropertyDto>;
  severity: Severity;
  source: Scalars['String'];
  type: Scalars['String'];
};

export type InstallStatus = {
  __typename?: 'InstallStatus';
  counts: StateCounts;
  floors: Array<FloorStatus>;
  step: InstallStep;
};

export enum InstallStep {
  Deinstall = 'deinstall',
  Infrastructure = 'infrastructure',
  Maintain = 'maintain',
  Planning = 'planning',
  Sensors = 'sensors'
}

export type InventoryItemDto = ResourceDto & {
  __typename?: 'InventoryItemDTO';
  className?: Maybe<Scalars['String']>;
  fistSeenAtLocation?: Maybe<Scalars['Long']>;
  isShadow?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  lastGoodDataAtLocation?: Maybe<Scalars['Long']>;
  lastSeenAtLocation?: Maybe<Scalars['Long']>;
  name?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  unitAddress?: Maybe<UnitAddress>;
  version?: Maybe<Scalars['String']>;
};

export type InventoryListDto = ResourceDto & {
  __typename?: 'InventoryListDTO';
  billingAccountId?: Maybe<Scalars['String']>;
  billingAccountName?: Maybe<Scalars['String']>;
  billingInvoiceEmail?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  list?: Maybe<Array<InventoryItemDto>>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  unitAddress?: Maybe<UnitAddress>;
};

/**  Contains a Pair type-value, where the value is a Long. */
export type KeyValueDto = ResourceDto & {
  __typename?: 'KeyValueDTO';
  boolean?: Maybe<Scalars['Boolean']>;
  double?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['ID']>;
  long?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum Language {
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Es = 'es',
  Fi = 'fi',
  Fr = 'fr',
  It = 'it',
  Nb = 'nb',
  Se = 'se',
  Zh = 'zh'
}

export type Layer = {
  __typename?: 'Layer';
  contentType?: Maybe<Scalars['String']>;
  floorLevel?: Maybe<Scalars['Int']>;
  layerType: LayerType;
  meta?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['String']>;
};

export enum LayerType {
  Floorplan = 'floorplan',
  PlannedDevices = 'plannedDevices'
}

/**  Describes the level that an unit or asset is full at. */
export enum LevelState {
  Empty = 'empty',
  Full = 'full',
  Halffull = 'halffull',
  Percent10 = 'percent10',
  Percent20 = 'percent20',
  Percent30 = 'percent30',
  Percent40 = 'percent40',
  Percent50 = 'percent50',
  Percent60 = 'percent60',
  Percent70 = 'percent70',
  Percent80 = 'percent80',
  Percent90 = 'percent90',
  Quarterfull = 'quarterfull',
  Threquarterfull = 'threquarterfull'
}

/**
 *  Contains all different states of a life cycle of a unit. It is included in the UnitDTO along with the rest of the
 *  unit details.
 */
export enum LifeCycleState {
  Accepting = 'accepting',
  Deleted = 'deleted',
  OtherOwner = 'otherOwner',
  Present = 'present',
  SeenByDiscovery = 'seenByDiscovery',
  Shadow = 'shadow',
  SubUnit = 'subUnit',
  UnAccepted = 'unAccepted'
}

/**  LinkServerDTO object holds all information that describe a Yanzi Server. */
export type LinkServerDto = ResourceDto & {
  __typename?: 'LinkServerDTO';
  apiAccessUrl?: Maybe<Scalars['String']>;
  apiIp?: Maybe<Scalars['String']>;
  apiName?: Maybe<Scalars['String']>;
  apiPort?: Maybe<Scalars['Int']>;
  cirrusURL?: Maybe<Scalars['String']>;
  did?: Maybe<Scalars['String']>;
  domainId?: Maybe<Scalars['String']>;
  fionaConnectorIp?: Maybe<Scalars['String']>;
  fionaConnectorName?: Maybe<Scalars['String']>;
  fionaConnectorPort?: Maybe<Scalars['Int']>;
  isPeeringLinkServer?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  webIp?: Maybe<Scalars['String']>;
  webName?: Maybe<Scalars['String']>;
  webPort?: Maybe<Scalars['Int']>;
};

export type LocalConnectionDto = ResourceDto & {
  __typename?: 'LocalConnectionDTO';
  accountId?: Maybe<Scalars['String']>;
  cirrusURL?: Maybe<Scalars['String']>;
  did?: Maybe<Scalars['String']>;
  heartbeatCounter?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  location?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  server?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  url?: Maybe<Scalars['String']>;
  usn?: Maybe<Scalars['String']>;
  yanziProductType?: Maybe<Scalars['String']>;
};

/**
 *  LocationAddress object is used to uniquely identify a location consisting of one or more sensors.
 *  It cointains the location id and the server id.
 */
export type LocationAddress = ResourceDto & {
  __typename?: 'LocationAddress';
  key?: Maybe<Scalars['ID']>;
  locationId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  serverDid?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDto = ResourceDto & {
  __typename?: 'LocationDTO';
  /**  Get the account that owns this location. */
  account: AccountDto;
  accountId?: Maybe<Scalars['String']>;
  /**
   *  Get ALL units. This can generate large responses -- try to use the paginated units instead.
   * @deprecated Must use paginated version
   */
  allUnits?: Maybe<Array<UnitDto>>;
  /**  Get the value of the specified prop */
  customProperty?: Maybe<CustomPropertyDto>;
  /**  Get the accept list */
  discoveredDevices: Array<AcceptEntityDto>;
  /**  Get this locations gateway unit */
  gateway?: Maybe<UnitDto>;
  gwdid?: Maybe<Scalars['String']>;
  /**  Access system health information. */
  health: Health;
  /**  Contains metrics on the installation progress. */
  installStatus: InstallStatus;
  /**  Get the inventory list. The inventory list contains extra data about physical devices connected to the system. */
  inventory?: Maybe<InventoryListDto>;
  isMultiLocation?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  linkServerDid?: Maybe<Scalars['String']>;
  locationAddress?: Maybe<LocationAddress>;
  locationId?: Maybe<Scalars['String']>;
  multiLocationParent?: Maybe<Scalars['String']>;
  /**  Get the current user's access level to this location. */
  myAccessLevel: SystemUserAcl;
  name?: Maybe<Scalars['String']>;
  /**  Access this locations ontology information */
  ontology: Ontology;
  /**  Get a specific planned device using the id. */
  plannedDevice?: Maybe<PlannedDeviceDto>;
  /**  Get a paginated list of planned devices. */
  plannedDevices: PaginatedPlannedDeviceDto;
  /**  List all properties */
  properties: Array<CustomPropertyDto>;
  /**
   *  Get the value of the specified property
   * @deprecated use customProperty
   */
  property?: Maybe<PropertyDto>;
  propertyList?: Maybe<Array<PropertyDto>>;
  /**  Get the provisioning details for this location */
  provisioning: PaginatedProvisioningDto;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
  unit?: Maybe<UnitDto>;
  unitCount?: Maybe<Scalars['Int']>;
  units: PaginatedUnitDto;
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoCustomPropertyArgs = {
  propertyName: Scalars['String'];
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoPlannedDeviceArgs = {
  planningId: Scalars['String'];
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoPlannedDevicesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  floorLevel?: InputMaybe<Scalars['Int']>;
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoPropertyArgs = {
  name: PropertyName;
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoProvisioningArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  floorLevel?: InputMaybe<Scalars['Int']>;
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoUnitArgs = {
  did?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


/**
 *  LocationDTO object holds all information that describe a location. It contains a time of
 *  generation, a time of last modification, a LocationAddress object, a name, an account id, a
 *  gateway id and Yanzi Server id.
 */
export type LocationDtoUnitsArgs = {
  after?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<Array<UnitFilterInput>>;
  first?: InputMaybe<Scalars['Int']>;
  floorLevel?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type LocationDto2 = ResourceDto & {
  __typename?: 'LocationDTO2';
  accountId?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  gatewayDid?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  locationAddress?: Maybe<LocationAddress>;
  locationId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  onlineStatus?: Maybe<OnlineStatusDto>;
  position?: Maybe<SamplePosition>;
  propertyList?: Maybe<Array<CustomPropertyDto>>;
  resourceType?: Maybe<Scalars['String']>;
  services?: Maybe<Array<ServiceDefinitionDto>>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
};

export type LocationGatewayStatus = ResourceDto & {
  __typename?: 'LocationGatewayStatus';
  gatewayDid?: Maybe<Scalars['String']>;
  gatewayType?: Maybe<GatewayType>;
  key?: Maybe<Scalars['ID']>;
  locationId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type LocationMutation = {
  __typename?: 'LocationMutation';
  /**
   *  Create the asset hierarchy from the specified id
   * Requires user role: manager
   */
  createFromOntology?: Maybe<UnitDto>;
  /**
   *  Create a single planned device
   * Requires user role: installer
   */
  createPlannedDevice?: Maybe<PlannedDeviceDto>;
  /**
   *  Bulk-create planned devices.
   * Requires user role: installer
   */
  createPlannedDevices: Array<PlannedDeviceDto>;
  /**
   *  Create a new asset
   * Requires user role: manager
   */
  createUnit?: Maybe<UnitDto>;
  /**
   *  Delete the specified planned device. Returns true if found and deleted.
   * Requires user role: installer
   */
  deletePlannedDevice?: Maybe<Scalars['String']>;
  /**
   *  Bulk delete planned devices. The IDs of deleted plans are returned.
   * Requires user role: installer
   */
  deletePlannedDevices: Array<Scalars['String']>;
  /**
   *  deleteData true if data should be deleted after FD.
   * Requires user role: installer
   */
  deleteProvisioning: ResponseCode;
  /**
   *  Factory default all devices. True if successful. deleteData true if data should be deleted after FD.
   * Requires user role: admin
   */
  factoryDefaultAllDevices: Scalars['Boolean'];
  /**
   *  Factory default the indicated devices. The dids of successful defaults are returned.
   *  deleteData true if data should be deleted after FD.
   * Requires user role: admin
   */
  factoryDefaultDevice: Array<Scalars['String']>;
  /**
   *  Initiate factory default for gateway
   * Requires user role: admin
   */
  factoryDefaultGateway: Scalars['Boolean'];
  /**
   *  Authenticate a new device
   * Requires user role: installer
   */
  provision?: Maybe<ProvisioningDto>;
  /**
   *  Set the system as deleted. A deleted system cannot send data but can be revived.
   *  Returns weather the system is now deleted or not.
   * Requires user role: admin
   */
  setDeleted: Scalars['Boolean'];
  /**
   * null
   * Requires user role: manager
   */
  setProperty: LocationDto;
  /**
   *  Mark a device as skipped
   * Requires user role: installer
   */
  skipPlannedDevice?: Maybe<PlannedDeviceDto>;
  /**
   *  Access mutations related to a specific unit
   * Requires user role: manager
   */
  unit?: Maybe<UnitMutation>;
  /**
   *  Clear the skipped status
   * Requires user role: installer
   */
  unskipPlannedDevice?: Maybe<PlannedDeviceDto>;
  /**
   *  Update properties on an already created planned device. This cannot set skipped, for that use skip() instead.
   * Requires user role: installer
   */
  updatePlannedDevice?: Maybe<PlannedDeviceDto>;
};


export type LocationMutationCreateFromOntologyArgs = {
  geoJsonId: Scalars['String'];
};


export type LocationMutationCreatePlannedDeviceArgs = {
  device: PlannedDeviceInput;
};


export type LocationMutationCreatePlannedDevicesArgs = {
  devices: Array<PlannedDeviceInput>;
};


export type LocationMutationCreateUnitArgs = {
  unit: CreateUnitInput;
};


export type LocationMutationDeletePlannedDeviceArgs = {
  planningId: Scalars['String'];
};


export type LocationMutationDeletePlannedDevicesArgs = {
  planningIds: Array<Scalars['String']>;
};


export type LocationMutationDeleteProvisioningArgs = {
  deleteData?: InputMaybe<Scalars['Boolean']>;
  did: Scalars['String'];
};


export type LocationMutationFactoryDefaultAllDevicesArgs = {
  deleteData?: InputMaybe<Scalars['Boolean']>;
};


export type LocationMutationFactoryDefaultDeviceArgs = {
  deleteData?: InputMaybe<Scalars['Boolean']>;
  dids: Array<Scalars['String']>;
};


export type LocationMutationProvisionArgs = {
  device: AuthenticateInput;
};


export type LocationMutationSetDeletedArgs = {
  deleted: Scalars['Boolean'];
};


export type LocationMutationSetPropertyArgs = {
  name: PropertyName;
  value: Scalars['String'];
};


export type LocationMutationSkipPlannedDeviceArgs = {
  planningId: Scalars['String'];
  reason: Scalars['String'];
};


export type LocationMutationUnitArgs = {
  did?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type LocationMutationUnskipPlannedDeviceArgs = {
  planningId: Scalars['String'];
};


export type LocationMutationUpdatePlannedDeviceArgs = {
  device: PlannedDeviceInput;
  planningId: Scalars['String'];
};

/**  The LoginState provides information of what is the status of the Cirrus API service. */
export enum LoginState {
  AccountDtoInPlace = 'accountDTOInPlace',
  Blocked = 'blocked',
  CertificateInPlace = 'certificateInPlace',
  CertificateInProgress = 'certificateInProgress',
  NoCertificate = 'noCertificate',
  NormalUserCertificate = 'normalUserCertificate',
  SingleAccountCertificate = 'singleAccountCertificate',
  SuperUserCertificate = 'superUserCertificate',
  UserDtoInPlace = 'userDTOInPlace'
}

export type Manifest = {
  __typename?: 'Manifest';
  floors: Array<Floor>;
  layers: Array<Layer>;
};

/**  Object containing Name, Type and Value for a filtering based on the match. */
export type MatchDto = ResourceDto & {
  __typename?: 'MatchDTO';
  key?: Maybe<Scalars['ID']>;
  matchName?: Maybe<MatchName>;
  matchType?: Maybe<MatchType>;
  matchValue?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  Enum defining the possible matching parameters */
export enum MatchName {
  AssetParent = 'assetParent',
  ChassisDid = 'chassisDid',
  DataSink = 'dataSink',
  Did = 'did',
  KiraAssetType = 'kiraAssetType',
  LifeCycleState = 'lifeCycleState',
  UnitTypeFixed = 'unitTypeFixed'
}

/**  Enum defining the different type of matching (exact match, any, empty, etc.) */
export enum MatchType {
  Any = 'any',
  Empty = 'empty',
  Equals = 'equals'
}

/**
 *  MessageIdentifier object is an optional parameter in every Cirrus message, and is used to track sent requests.
 *  Every response contains the same MessageIdentifier object as the request that caused it.
 */
export type MessageIdentifier = ResourceDto & {
  __typename?: 'MessageIdentifier';
  key?: Maybe<Scalars['ID']>;
  messageId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Accept the Yanzi Terms of Service. */
  acceptToS: UserDto;
  /**  Access a specific account */
  account?: Maybe<AccountMutation>;
  /**  Access multiple accounts */
  accounts: Array<AccountMutation>;
  /**  Create a new account. */
  createAccount?: Maybe<AccountDto>;
  /**  Access the specified location. */
  location?: Maybe<LocationMutation>;
  /**  Peer a gateway */
  peer: PeeringResponseCode;
};


export type MutationAccountArgs = {
  account?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateAccountArgs = {
  name: Scalars['String'];
};


export type MutationLocationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locationId?: InputMaybe<Scalars['String']>;
};


export type MutationPeerArgs = {
  device: PeeringInput;
};

export type NamedPropertyInput = {
  propertyName: PropertyName;
  propertyValue: Scalars['String'];
};

export type NativeClientDto = ResourceDto & {
  __typename?: 'NativeClientDTO';
  data?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  unitAddress?: Maybe<UnitAddress>;
};

export type OnlineStatusDto = ResourceDto & {
  __typename?: 'OnlineStatusDTO';
  key?: Maybe<Scalars['ID']>;
  linkServerId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  status?: Maybe<Status>;
  timeConnected?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeLastSeen?: Maybe<Scalars['Long']>;
};

/**  Various function to interact with the ontology. */
export type Ontology = {
  __typename?: 'Ontology';
  /**  Get the candidate specified by geoJsonId */
  candidate?: Maybe<AssetCandidate>;
  /**  Get the candidates that intersects the provided envelope. */
  cut: Array<AssetCandidate>;
  /**  Get the floorplan in GeoJSON format. */
  floorplan?: Maybe<Scalars['GeoJsonFeatureCollection']>;
  /**
   *  Find candidates at a given point. If bboxOnly is true, then only the bounding box is considered. This is faster
   *  and allows for discovery of objects that have no surface, such as a line.
   *  By default only the BBOX is calculated.
   */
  intersect: Array<AssetCandidate>;
  manifest?: Maybe<Manifest>;
  /**  Get the Root asset candidate */
  root?: Maybe<AssetCandidate>;
  /**  The warnings generated by the ontology engine, by floor. */
  warnings: Array<FloorWarnings>;
};


/**  Various function to interact with the ontology. */
export type OntologyCandidateArgs = {
  geoJsonId: Scalars['String'];
};


/**  Various function to interact with the ontology. */
export type OntologyCutArgs = {
  envelope: Envelope;
  floorLevel: Scalars['Int'];
};


/**  Various function to interact with the ontology. */
export type OntologyFloorplanArgs = {
  addSensors?: InputMaybe<Scalars['Boolean']>;
  envelope?: InputMaybe<Envelope>;
  filter?: InputMaybe<Scalars['Boolean']>;
  floorLevel: Scalars['Int'];
};


/**  Various function to interact with the ontology. */
export type OntologyIntersectArgs = {
  bboxOnly?: InputMaybe<Scalars['Boolean']>;
  floorLevel: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/**  The OpenClosedState indicates the open/closed/unknown state of a monitored instance. */
export enum OpenClosedState {
  Closed = 'closed',
  Open = 'open',
  Unknown = 'unknown'
}

export enum OperatingPowerState {
  Unknown = 'unknown',
  UsingBattery = 'usingBattery',
  UsingGrid = 'usingGrid',
  UsingGridAndChargingUps = 'usingGridAndChargingUPS',
  UsingUps = 'usingUPS'
}

/**  Describes whether the output state of a device is set to ON or OFF. */
export enum OutputValue {
  Off = 'off',
  Onn = 'onn'
}

export type Paginated = {
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type PaginatedCustomPropertyDto = Paginated & {
  __typename?: 'PaginatedCustomPropertyDTO';
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  list: Array<CustomPropertyDto>;
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type PaginatedLocationDto = Paginated & {
  __typename?: 'PaginatedLocationDTO';
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  list?: Maybe<Array<LocationDto>>;
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type PaginatedPlannedDeviceDto = Paginated & {
  __typename?: 'PaginatedPlannedDeviceDTO';
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  list: Array<PlannedDeviceDto>;
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type PaginatedProvisioningDto = Paginated & {
  __typename?: 'PaginatedProvisioningDTO';
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  list: Array<ProvisioningDto>;
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

export type PaginatedUnitDto = Paginated & {
  __typename?: 'PaginatedUnitDTO';
  cursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  list: Array<UnitDto>;
  numPages?: Maybe<Scalars['Int']>;
  pageSize: Scalars['Int'];
};

/**  Contains a Pair type-value, where the value is a Long. */
export type PairDto = ResourceDto & {
  __typename?: 'PairDTO';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Long']>;
};

export type PeeringInput = {
  accountNumber: Scalars['String'];
  did: Scalars['String'];
  name: Scalars['String'];
  position?: InputMaybe<PositionInput>;
  properties?: InputMaybe<Array<NamedPropertyInput>>;
};

export enum PeeringResponseCode {
  AlreadyPeered = 'alreadyPeered',
  InUse = 'inUse',
  LocationIdError = 'locationIdError',
  LocationNonExistent = 'locationNonExistent',
  NotAdmin = 'notAdmin',
  OldVersion = 'oldVersion',
  RegisterFail = 'registerFail',
  RegisterSuccess = 'registerSuccess',
  RequestSent = 'requestSent'
}

export type PlanDto = ResourceDto & {
  __typename?: 'PlanDTO';
  accountNumber?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  /**  Get a specific planned device using the id. */
  plannedDevice?: Maybe<PlannedDeviceDto>;
  /**  Get a paginated list of planned devices. */
  plannedDevices: PaginatedPlannedDeviceDto;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};


export type PlanDtoPlannedDeviceArgs = {
  planningId: Scalars['String'];
};


export type PlanDtoPlannedDevicesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  floorLevel?: InputMaybe<Scalars['Int']>;
};

/**  Represents a planned device in the planning tool. */
export type PlannedDeviceDto = ResourceDto & {
  __typename?: 'PlannedDeviceDTO';
  customProperties?: Maybe<Array<CustomPropertyDto>>;
  id?: Maybe<Scalars['String']>;
  isSkipped?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  partNumber?: Maybe<Scalars['String']>;
  position?: Maybe<SamplePosition>;
  properties?: Maybe<Array<UnitProperty>>;
  resourceType?: Maybe<Scalars['String']>;
  skipReason?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeSkipped?: Maybe<Scalars['Long']>;
};

export type PlannedDeviceInput = {
  customProperties?: InputMaybe<Array<PropertyInput>>;
  partNumber: Scalars['String'];
  position: PositionInput;
  properties?: InputMaybe<Array<NamedPropertyInput>>;
};

export type Point = Sample & {
  __typename?: 'Point';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
};

export type PointSeries = ResourceDto & {
  __typename?: 'PointSeries';
  dataSourceAddress?: Maybe<DataSourceAddress>;
  key?: Maybe<Scalars['ID']>;
  list?: Maybe<Array<Point>>;
  range?: Maybe<Range>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum PointType {
  Boundary = 'boundary',
  BreakLine = 'breakLine',
  ContinueLine = 'continueLine'
}

export type PointWithMaxMin = Sample & {
  __typename?: 'PointWithMaxMin';
  key?: Maybe<Scalars['ID']>;
  maxValue?: Maybe<Scalars['Float']>;
  minValue?: Maybe<Scalars['Float']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
};

/**  Services provided by portals. */
export enum PortalService {
  Insights = 'INSIGHTS',
  Tunnel = 'TUNNEL',
  Authentication = 'authentication',
  Database = 'database',
  Linkservice = 'linkservice',
  LinkserviceWs = 'linkserviceWs',
  Messaging = 'messaging',
  Monitoring = 'monitoring',
  Peering = 'peering'
}

export type PositionInput = {
  floorLevel: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/**
 *  PositionType enum defines different representations of position and the properties that each one
 *  of them contains.
 */
export enum PositionType {
  FullPosition = 'fullPosition',
  LatLong = 'latLong',
  LatLongAltitudeTime = 'latLongAltitudeTime',
  LatLongTime = 'latLongTime',
  LatLongTimeFloor = 'latLongTimeFloor'
}

export enum PowerType {
  Battery = 'battery',
  Grid = 'grid',
  Unknown = 'unknown',
  Ups = 'ups'
}

/**
 *  Object defining a Property. Those properties are system
 *  defined by PropertyName and the value must be of
 *  the type defined in the corresponding PropertyName.
 */
export type PropertyDto = ResourceDto & {
  __typename?: 'PropertyDTO';
  booleanValue?: Maybe<Scalars['Boolean']>;
  doubleValue?: Maybe<Scalars['Float']>;
  integerValue?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  longValue?: Maybe<Scalars['Long']>;
  propertyName?: Maybe<PropertyName>;
  resourceType?: Maybe<Scalars['String']>;
  stringValue?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type PropertyInput = {
  propertyName: Scalars['String'];
  propertyValue: Scalars['String'];
};

/**  System-defined PropertyNames and their attributes (type of value, is it a list structure, etc.) */
export enum PropertyName {
  Bim = 'BIM',
  Account = 'account',
  Activelow = 'activelow',
  ActivityLevel = 'activityLevel',
  AssetParentId = 'assetParentId',
  AutomaticReArm = 'automaticReArm',
  BatteryPowered = 'batteryPowered',
  BlockedGroup = 'blockedGroup',
  BlockedUser = 'blockedUser',
  Building = 'building',
  Capability = 'capability',
  CipherData = 'cipherData',
  ConnectAssetAnalogAll = 'connectAssetAnalogAll',
  ConnectAssetOccupancy = 'connectAssetOccupancy',
  ConnectionNotId = 'connectionNotId',
  ConnectionStableTimer = 'connectionStableTimer',
  CountryCode = 'countryCode',
  Dashboard = 'dashboard',
  DataSink = 'dataSink',
  DataSinkPolygonId = 'dataSinkPolygonId',
  DataSource = 'dataSource',
  Datafactor = 'datafactor',
  DayFilter = 'dayFilter',
  DefaultUnitVisibility = 'defaultUnitVisibility',
  Deleted = 'deleted',
  DeviceAdminBlocked = 'deviceAdminBlocked',
  Enable = 'enable',
  EnableDoublePoll = 'enableDoublePoll',
  EnergyElectricalFifi = 'energyElectricalFifi',
  Facility = 'facility',
  Favorite = 'favorite',
  Floor = 'floor',
  GeoJson = 'geoJSON',
  GroupJudgeType = 'groupJudgeType',
  GroupOutputType = 'groupOutputType',
  HeightAboveFloor = 'heightAboveFloor',
  Hidden = 'hidden',
  IfcGlobalId = 'ifcGlobalId',
  InitialMissingInputDelayTimer = 'initialMissingInputDelayTimer',
  IsSina = 'isSina',
  IsSystemInternalVisibility = 'isSystemInternalVisibility',
  JsonCustomBlob = 'jsonCustomBlob',
  JudgeId = 'judgeId',
  LastChangeTimestamp = 'lastChangeTimestamp',
  LifecycleVersion = 'lifecycleVersion',
  LocationAndJudgeId = 'locationAndJudgeId',
  LocationId = 'locationId',
  LocationType = 'locationType',
  LogicSink = 'logicSink',
  LogicSource = 'logicSource',
  LogicalName = 'logicalName',
  Logicalgroups = 'logicalgroups',
  Logicaltype = 'logicaltype',
  Maxrecordingage = 'maxrecordingage',
  MeterOffsetByUser = 'meterOffsetByUser',
  ModBusUnitCache = 'modBusUnitCache',
  MyChassis = 'myChassis',
  MyParentDid = 'myParentDid',
  Mybackupset = 'mybackupset',
  Mydid = 'mydid',
  NotifySink = 'notifySink',
  NotifySource = 'notifySource',
  ObjectThickness = 'objectThickness',
  OneWire26intrArray = 'oneWire26intrArray',
  OuputDid = 'ouputDid',
  OutputAlwaysOn = 'outputAlwaysOn',
  OverrideUserAclInPhysical = 'overrideUserAclInPhysical',
  PerUserAcl = 'perUserAcl',
  PolygonId = 'polygonId',
  PositionDataString = 'positionDataString',
  Producer = 'producer',
  ProductType = 'productType',
  Pulsesperkwh = 'pulsesperkwh',
  RadioChannel = 'radioChannel',
  RadioNetwork = 'radioNetwork',
  RadioPanId = 'radioPanId',
  ReArmTimer = 'reArmTimer',
  Room = 'room',
  SimMsisdn = 'simMSISDN',
  SingleDataSource = 'singleDataSource',
  Template = 'template',
  ThresholdValue = 'thresholdValue',
  TimeZone = 'timeZone',
  TriggDealayTimer = 'triggDealayTimer',
  Undefined = 'undefined',
  UplinkCapacity = 'uplinkCapacity',
  VideoQuality = 'videoQuality',
  ZeroLevel = 'zeroLevel',
  Zone = 'zone'
}

export type ProspectMutation = {
  __typename?: 'ProspectMutation';
  /**
   *  Create a single planned device
   * Requires user role: manager
   */
  createPlannedDevice?: Maybe<PlannedDeviceDto>;
  /**
   *  Bulk-create planned devices.
   * Requires user role: manager
   */
  createPlannedDevices: Array<PlannedDeviceDto>;
  /**
   *  Delete this prospect
   * Requires user role: admin
   */
  delete: Scalars['Boolean'];
  /**
   *  Delete the specified planned device. Returns true if found and deleted.
   * Requires user role: manager
   */
  deletePlannedDevice?: Maybe<Scalars['String']>;
  /**
   *  Bulk delete planned devices. The IDs of deleted plans are returned.
   * Requires user role: manager
   */
  deletePlannedDevices: Array<Scalars['String']>;
  /**
   *  Update properties on an already created planned device. This cannot set skipped, for that use skip() instead.
   * Requires user role: manager
   */
  updatePlannedDevice?: Maybe<PlannedDeviceDto>;
};


export type ProspectMutationCreatePlannedDeviceArgs = {
  device: PlannedDeviceInput;
};


export type ProspectMutationCreatePlannedDevicesArgs = {
  devices: Array<PlannedDeviceInput>;
};


export type ProspectMutationDeletePlannedDeviceArgs = {
  planningId: Scalars['String'];
};


export type ProspectMutationDeletePlannedDevicesArgs = {
  planningIds: Array<Scalars['String']>;
};


export type ProspectMutationUpdatePlannedDeviceArgs = {
  device: PlannedDeviceInput;
  planningId: Scalars['String'];
};

/**
 *  ProvisioningDTO object holds all information that describe a the provisioning state of a unit.
 *  It contains the id of the sensor (normally the Hardware serial number EUI64-XXX), the locationId,
 *  the public key of the device, the DeployState indicating the device state in the system, the productType
 *  and optionally the properties and the position of the device. If existing it may also contain the virtualId and the
 *  planningId of the device.
 */
export type ProvisioningDto = ResourceDto & {
  __typename?: 'ProvisioningDTO';
  customPropertyList?: Maybe<Array<CustomPropertyDto>>;
  deployState?: Maybe<DeployState>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  locationId?: Maybe<Scalars['String']>;
  planningId?: Maybe<Scalars['String']>;
  position?: Maybe<SamplePosition>;
  productType?: Maybe<Scalars['String']>;
  propertyList?: Maybe<Array<UnitProperty>>;
  pubKeyGw?: Maybe<Scalars['String']>;
  pubKeyOwner?: Maybe<Scalars['String']>;
  pubKeySelf?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeLastDeployStateChange?: Maybe<Scalars['Long']>;
  /**  The unit created by this provisioning. Will return null unless the deployState == provisioned. */
  unit?: Maybe<UnitDto>;
  vid?: Maybe<Scalars['String']>;
};

export enum PushPolicy {
  AnalogChange = 'analogChange',
  AnalogSlot10min = 'analogSlot10min',
  DigitalChange = 'digitalChange',
  Minimal10minOrWhenDigitalChange = 'minimal10minOrWhenDigitalChange',
  RawData = 'rawData',
  RawDataBurst10Values = 'rawDataBurst10Values',
  RawLimit10min = 'rawLimit10min',
  SuppressedByAdmin = 'suppressedByAdmin',
  SuppressedByDependency = 'suppressedByDependency',
  SuppressedByFault = 'suppressedByFault'
}

export enum PushPolicyLevel {
  Burst = 'burst',
  High = 'high',
  Kira = 'kira',
  Low = 'low',
  Medium = 'medium',
  Raw = 'raw',
  Target10min = 'target10min'
}

export enum PushPolicyState {
  AnalogChange = 'analogChange',
  AnalogSlot10min = 'analogSlot10min',
  Asset10minOnly = 'asset10minOnly',
  DigitalChange = 'digitalChange',
  Minimal10minOrWhenDigitalChange = 'minimal10minOrWhenDigitalChange',
  RawData = 'rawData',
  RawDataBurst10Values = 'rawDataBurst10Values',
  RawLimit10min = 'rawLimit10min',
  SuppressedByAdmin = 'suppressedByAdmin',
  SuppressedByDependency = 'suppressedByDependency',
  SuppressedByFault = 'suppressedByFault'
}

export type Query = {
  __typename?: 'Query';
  /**  Get an account by the accountId. */
  account?: Maybe<AccountDto>;
  /**  The accounts that the current user has access to. */
  accounts: Array<AccountDto>;
  /**
   *  Get all locations.
   * @deprecated Use the paginated version
   */
  allLocations: Array<LocationDto>;
  /**  List the server capabilities. */
  capabilities: Array<Capability>;
  /**
   *  Get the location with the specific location id. If the id is not specified, then the system will pick the most
   *  appropriate location.
   */
  location?: Maybe<LocationDto>;
  /**  The total number of locations available to the user at this endpoint. */
  locationCount: Scalars['Int'];
  /**  Get a list of locations. */
  locations: PaginatedLocationDto;
  /**  Get the current user */
  me: UserDto;
  /**  The version of the Datamodel */
  version: Scalars['String'];
};


export type QueryAccountArgs = {
  account: Scalars['String'];
};


export type QueryLocationArgs = {
  id?: InputMaybe<Scalars['ID']>;
  locationId?: InputMaybe<Scalars['String']>;
};


export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type RadioComStatsDto = ResourceDto & {
  __typename?: 'RadioComStatsDTO';
  band?: Maybe<Scalars['Int']>;
  channel?: Maybe<Scalars['Int']>;
  channelTable?: Maybe<Scalars['Int']>;
  distance?: Maybe<Scalars['Float']>;
  flags?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  lateDataCounter?: Maybe<Scalars['Long']>;
  lostContactCounter?: Maybe<Scalars['Long']>;
  parent?: Maybe<UnitDto>;
  parentChassisDid?: Maybe<Scalars['String']>;
  parentDid?: Maybe<Scalars['String']>;
  parentMetric?: Maybe<Scalars['Float']>;
  parentRank?: Maybe<Scalars['Float']>;
  rankViaParent?: Maybe<Scalars['Float']>;
  resourceType?: Maybe<Scalars['String']>;
  rssi?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  The Range object is used to define a time period. It contains a start and an end point in time. */
export type Range = ResourceDto & {
  __typename?: 'Range';
  key?: Maybe<Scalars['ID']>;
  length?: Maybe<Scalars['Long']>;
  numberOfSamples?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeEnd?: Maybe<Scalars['Long']>;
  timeStart?: Maybe<Scalars['Long']>;
};

/**  Not available yet! - RealmDTO object the minimale information that describe a Yanzi Master Server. */
export type RealmDto = ResourceDto & {
  __typename?: 'RealmDTO';
  copname?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  dnsName?: Maybe<Scalars['String']>;
  ipAdr?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  realmId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
  trustJKS?: Maybe<Scalars['String']>;
  trustPwd?: Maybe<Scalars['String']>;
};

export enum RefillableType {
  CFoldBundle = 'CFoldBundle',
  Handwash1000 = 'Handwash1000',
  SystemToilet800 = 'SystemToilet800',
  SystemTowelM2 = 'SystemTowelM2'
}

export type ResourceDto = {
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  Contains all different response codes that exist. Response codes are included in all responses
 *  that are being dispatched as a result of a request message, and indicate whether the result of
 *  the requested operation. The most common is "success", that indicates that everything when
 *  smoothly, however there are many cases that something may go wrong. Useful also for development
 *  purposes.
 */
export enum ResponseCode {
  ErrorAuthentication = 'errorAuthentication',
  ErrorChannelNotAvailable = 'errorChannelNotAvailable',
  ErrorDestinationUnavailable = 'errorDestinationUnavailable',
  ErrorInternalMapperMissing = 'errorInternalMapperMissing',
  ErrorInvalidDestination = 'errorInvalidDestination',
  ErrorInvalidMessage = 'errorInvalidMessage',
  ErrorInvokingMessage = 'errorInvokingMessage',
  ErrorNotFound = 'errorNotFound',
  ErrorSourceIsTransient = 'errorSourceIsTransient',
  ErrorUnknown = 'errorUnknown',
  ErrorUnknownMessage = 'errorUnknownMessage',
  ErrorUnsupportedRequest = 'errorUnsupportedRequest',
  InProgress = 'inProgress',
  Success = 'success'
}

export type Sample = {
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  Sample that contains the information from an accelerometer sensor. */
export type SampleAccelerometer = Sample & {
  __typename?: 'SampleAccelerometer';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  valueX?: Maybe<Scalars['Float']>;
  valueY?: Maybe<Scalars['Float']>;
  valueZ?: Maybe<Scalars['Float']>;
};

/**
 *  The SampleAsset object is used to represent a sample comming from an asset entity. It contains an
 *  AssetState and (optionally) a LevelState value.
 */
export type SampleAsset = Sample & {
  __typename?: 'SampleAsset';
  assetState?: Maybe<AssetState>;
  key?: Maybe<Scalars['ID']>;
  levelState?: Maybe<LevelState>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  The SampleBattery contains the voltage measured in millivolts (mV) as a value and the corresponding percentage of battery left. */
export type SampleBattery = Sample & {
  __typename?: 'SampleBattery';
  key?: Maybe<Scalars['ID']>;
  percentFull?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  temperature?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
  voltage?: Maybe<Scalars['Long']>;
};

/**  The SampleBatteryPower object contains all information about the status of the battery. */
export type SampleBatteryPower = Sample & {
  __typename?: 'SampleBatteryPower';
  buckets?: Maybe<Array<Scalars['Long']>>;
  estimatedBatteryReplaceTime?: Maybe<Scalars['Long']>;
  estimatedBootTime?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  temperature?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
  voltage?: Maybe<Scalars['Long']>;
};

/**  The SampleBoolean object is used to represent a sample of a binary source (true or false). */
export type SampleBoolean = Sample & {
  __typename?: 'SampleBoolean';
  isValue?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleBooleanCounter object is samilar to the SampleBoolean one, but it also contains a counter
 *  value.
 */
export type SampleBooleanCounter = Sample & {
  __typename?: 'SampleBooleanCounter';
  counter?: Maybe<Scalars['Long']>;
  isValue?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleCO2 object is used to represent a sample generated from a CO2 sensor. The value is
 *  reported in ppm(eg. 567ppm of CO2).
 */
export type SampleCo2 = Sample & {
  __typename?: 'SampleCO2';
  cO2?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleCommunicationStatistics object contains statistics about the communication
 *  of a certain unit.
 */
export type SampleCommunicationStatistics = Sample & {
  __typename?: 'SampleCommunicationStatistics';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  rxBytes?: Maybe<Scalars['Long']>;
  rxPackets?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  txBytes?: Maybe<Scalars['Long']>;
  txBytesDropped?: Maybe<Scalars['Long']>;
  txPackets?: Maybe<Scalars['Long']>;
};

/**
 *  The Sample class represents a single piece of data coming from a sensor. It is the superclass of
 *  the specific classes that describe specific data ({@link SampleBoolean}, {@link SampleLong},
 *  {@link SampleDouble},{@link SampleBooleanCounter}), {@link SampleString} and represent data used
 *  for temperature, humidity , motion etc. This class only contains the value of the time (long for
 *  msec) that the sample was captured.
 */
export type SampleDto = Sample & {
  __typename?: 'SampleDTO';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type SampleDispenser = Sample & {
  __typename?: 'SampleDispenser';
  key?: Maybe<Scalars['ID']>;
  refillableType?: Maybe<RefillableType>;
  refillables?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
  worstCaseRefillables?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleDistance object is used to represent a sample containing a distance value. This value
 *  is measured in mm(eg. 1234mm).
 */
export type SampleDistance = Sample & {
  __typename?: 'SampleDistance';
  distance?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  status?: Maybe<SampleStatus>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SampleDouble object is used to represent a sample containing a double value (eg. 12.34). */
export type SampleDouble = Sample & {
  __typename?: 'SampleDouble';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
};

/**
 *  The SampleDraining object represents the Draining State for a measurement. The value indicates the Total Instant
 *  Power drained in mW. The Draining state (draining/not draining) is calculated using the thresholds in the sample.
 */
export type SampleDraining = Sample & {
  __typename?: 'SampleDraining';
  drainingState?: Maybe<DrainingState>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  thresholdLower?: Maybe<Scalars['Float']>;
  thresholdUpper?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  totalPowerInstant?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

export type SampleElectrical = Sample & {
  __typename?: 'SampleElectrical';
  freq?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['ID']>;
  phases?: Maybe<Array<ElectricalPhaseDto>>;
  powerFactor?: Maybe<Scalars['Float']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  totalEnergy?: Maybe<Scalars['Long']>;
  totalPower?: Maybe<Scalars['Float']>;
};

/**
 *  The SampleElectricalEnergySimple object contains a sample generated from a general output device.
 *  It always contains the value of the totalEnergy consumed by the device expressed in mWs and the
 *  instant power expressed in W.
 *  It may also contain the voltage of the line expressed in mV, the current intensity expressed in mA,
 *  the total amount of apparent energy expressed in mWs and the total amount of time expressed in ms
 *  that the instant power has been above 25W.
 */
export type SampleElectricalEnergySimple = Sample & {
  __typename?: 'SampleElectricalEnergySimple';
  instantPower?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  lineCurrent?: Maybe<Scalars['Long']>;
  lineVoltage?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeDraining?: Maybe<Scalars['Long']>;
  totalApparentEnergy?: Maybe<Scalars['Long']>;
  totalEnergy?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleEndOfSlot object is used to represent the last sample received during an slot
 *  (time interval) it contains a slotSize that defines that interval size and the mentioned sample.
 */
export type SampleEndOfSlot = Sample & {
  __typename?: 'SampleEndOfSlot';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  sample?: Maybe<SampleDto>;
  slotSize?: Maybe<SlotSize>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  SampleFootfall contains information about the main counter of a Footfall camera.
 *  The main value (value) is the ingress counter and the sample also contains the egress counter. The devicesMissing / total is
 *  used in aggregations over multiple sensors in assets. A user may use that value to judge the accuracy of the value.
 */
export type SampleFootfall = Sample & {
  __typename?: 'SampleFootfall';
  devicesMissing?: Maybe<Scalars['Int']>;
  devicesTotal?: Maybe<Scalars['Int']>;
  egress?: Maybe<Scalars['Long']>;
  ingress?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SampleForce object is used to represent a sample containing force in milliNewtons (eg. 9800 mN). */
export type SampleForce = Sample & {
  __typename?: 'SampleForce';
  force?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

export type SampleGeneric = Sample & {
  __typename?: 'SampleGeneric';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  values?: Maybe<Array<KeyValueDto>>;
};

/**  Sample that contains the information from a gyroscope sensor. */
export type SampleGyro = Sample & {
  __typename?: 'SampleGyro';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  valueX?: Maybe<Scalars['Float']>;
  valueY?: Maybe<Scalars['Float']>;
  valueZ?: Maybe<Scalars['Float']>;
};

export type SampleHeartRatePeriod = Sample & {
  __typename?: 'SampleHeartRatePeriod';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleHumidity ojbect is used to represent a sample containing humidity value in percentage (0-100).
 *  Optionally it can contain also a temperature value expressed in Kelvins.
 */
export type SampleHumidity = Sample & {
  __typename?: 'SampleHumidity';
  humidity?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  temperature?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
};

/**
 *  The SampleIlluminance object is used to represent a sample containing illuminance in mlux (eg. 567000 mlux).
 *  If supported by the sensor element, it will also contain the colorTemperature in K (eg. 5725 K).
 */
export type SampleIlluminance = Sample & {
  __typename?: 'SampleIlluminance';
  colorTemperature?: Maybe<Scalars['Long']>;
  illuminance?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  statusValue?: Maybe<SampleStatus>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  SampleImageTime represents a sample which contain the time stamp of an image existing
 *  in the database.
 */
export type SampleImage = Sample & {
  __typename?: 'SampleImage';
  binaryWrapper?: Maybe<BinaryWrapperDto>;
  dimentions?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type SampleImageTime = Sample & {
  __typename?: 'SampleImageTime';
  dimentions?: Maybe<Scalars['String']>;
  format?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleLamp object contains a sample created from a Yanzi LED. It contains a value
 *  indicating the percentage of intensity of the lamp (0 off - 100 totally on) and
 *  a counter indicating how many times the lamp has been switched.
 */
export type SampleLamp = Sample & {
  __typename?: 'SampleLamp';
  counter?: Maybe<Scalars['Long']>;
  intensity?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

export type SampleList = {
  __typename?: 'SampleList';
  dataSourceAddress?: Maybe<DataSourceAddress>;
  firstSample?: Maybe<Sample>;
  isEmpty: Scalars['Boolean'];
  key?: Maybe<Scalars['String']>;
  list?: Maybe<Array<Maybe<Sample>>>;
  range?: Maybe<Range>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  /**  Time of Last Data Synchronized */
  timeLastDataSync?: Maybe<Scalars['Long']>;
};

/**  The SampleLog objects contains logging info from a device. */
export type SampleLog = Sample & {
  __typename?: 'SampleLog';
  key?: Maybe<Scalars['ID']>;
  log?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['String']>;
};

/**  The SampleLong object is used to represent a sample that contains a long value. */
export type SampleLong = Sample & {
  __typename?: 'SampleLong';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  Sample for describing the state of a Motion device. The value indicates the number of times that motion has
 *  been detected since the node last boot and increments for every motion. timeLastMotion indicates the Time
 *  of the last motion in ms since epoch.
 */
export type SampleMotion = Sample & {
  __typename?: 'SampleMotion';
  approxDeviceBootTime?: Maybe<Scalars['Long']>;
  counter?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeLastMotion?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  Sample for describing the state of a Motion device. Every time motion is detected the motion
 *  counter is incremented one or more times.
 */
export type SampleMotion2Lars = Sample & {
  __typename?: 'SampleMotion2Lars';
  approxDeviceBootTime?: Maybe<Scalars['Long']>;
  counter?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeLastMotion?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

export type SampleNodeStatistics = Sample & {
  __typename?: 'SampleNodeStatistics';
  key?: Maybe<Scalars['ID']>;
  nbrId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeEstimatedBoot?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['String']>;
};

/**
 *  The SampleOnOff object represents the state of a source that can either be on (true) or off (false).
 *  It contains an optional toggle counter.
 */
export type SampleOnOff = Sample & {
  __typename?: 'SampleOnOff';
  counter?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  outputValue?: Maybe<OutputValue>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleOpenClosed object represents the state of a source that can either be open, closed or in an unknown state.
 *  It also contains the time of the last state change. It contains an optional open counter
 *  and an optional closed counter.
 */
export type SampleOpenClosed = Sample & {
  __typename?: 'SampleOpenClosed';
  counterClosed?: Maybe<Scalars['Long']>;
  counterOpen?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  openClosedValue?: Maybe<OpenClosedState>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeLastChange?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleParticulateMatter object is used to represent a sample generated from a particulate matter sensor.
 *  There are 4 possible samples points.
 *  <p>
 *  Note! Normally not every value is present in the sample.
 *  <p>
 *  All the sample points are in micrograms/m^3.
 *  <p>
 *  The pm10 represent sample for particles with a size less than 1.0 micrometer
 *  The pm25 represent sample for particles with a size less than 2.5 micrometer
 *  The pm40 represent sample for particles with a size less than 4.0 micrometer
 *  The pm100 represent sample for particles with a size less than 10.0 micrometer
 */
export type SampleParticulateMatter = Sample & {
  __typename?: 'SampleParticulateMatter';
  key?: Maybe<Scalars['ID']>;
  pm10?: Maybe<Scalars['Float']>;
  pm25?: Maybe<Scalars['Float']>;
  pm40?: Maybe<Scalars['Float']>;
  pm100?: Maybe<Scalars['Float']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  Sample for describing the number of people an unit. The number in represent how many people is in an
 *  area or something similar.
 */
export type SamplePeopleCount = Sample & {
  __typename?: 'SamplePeopleCount';
  counter?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SamplePercentage object is used to represent a sample containing a percentage. */
export type SamplePercentage = Sample & {
  __typename?: 'SamplePercentage';
  key?: Maybe<Scalars['ID']>;
  percentage?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SamplePosition object is used to represent a sample containing a position of an entity. */
export type SamplePosition = Sample & {
  __typename?: 'SamplePosition';
  accuracy?: Maybe<Scalars['Float']>;
  altitude?: Maybe<Scalars['Float']>;
  floorLevel?: Maybe<Scalars['Int']>;
  isStatic?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  positionType?: Maybe<PositionType>;
  provider?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeOfPosition?: Maybe<Scalars['Long']>;
};

export type SamplePowerUpdate = Sample & {
  __typename?: 'SamplePowerUpdate';
  isEmulate?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  percentage?: Maybe<Scalars['Long']>;
  powerType?: Maybe<PowerType>;
  resourceType?: Maybe<Scalars['String']>;
  state?: Maybe<OperatingPowerState>;
  time?: Maybe<Scalars['Long']>;
  timeBatteryDrainStarted?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeEstimateBatteryEmpty?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SamplePressure object is used to represent a sample containing pressure in Pa (eg. 101300 Pa). */
export type SamplePressure = Sample & {
  __typename?: 'SamplePressure';
  key?: Maybe<Scalars['ID']>;
  pressure?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  Sample that contains the information from a pulse band. */
export type SamplePulseBand = Sample & {
  __typename?: 'SamplePulseBand';
  id?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  The SampleRefillList is deprecated. */
export type SampleRefillList = Sample & {
  __typename?: 'SampleRefillList';
  key?: Maybe<Scalars['ID']>;
  refillables?: Maybe<Array<PairDto>>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  worstCareRefillables?: Maybe<Array<PairDto>>;
};

/**  The sample online status contains aggregated information on site connectivity. */
export type SampleSiteOnlineStatus = Sample & {
  __typename?: 'SampleSiteOnlineStatus';
  devicesMissing?: Maybe<Scalars['Int']>;
  devicesOffline?: Maybe<Scalars['Int']>;
  devicesOnline?: Maybe<Scalars['Int']>;
  devicesTroubled?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  slotSizeMs?: Maybe<Scalars['Long']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  totalMissedMotions?: Maybe<Scalars['Long']>;
  totalOnlineSlots?: Maybe<Scalars['Long']>;
  totalOnlineSlotsWithData?: Maybe<Scalars['Long']>;
  totalProcessedSamples?: Maybe<Scalars['Long']>;
};

export type SampleSoundClassification = Sample & {
  __typename?: 'SampleSoundClassification';
  counts?: Maybe<Array<PairDto>>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleSoundPressureLevel object is used to represent a sample containing sound pressure in mBA (milli Bell A-rated).
 *  The main value is the average sound pressure level during the measured inteval.
 *  It also contains the min and the max value observed during that interval and the corresponding SampleStatus that
 *  will indicate if measured values are outside the limits.
 */
export type SampleSoundPressureLevel = Sample & {
  __typename?: 'SampleSoundPressureLevel';
  key?: Maybe<Scalars['ID']>;
  max?: Maybe<Scalars['Long']>;
  min?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  sound?: Maybe<Scalars['Long']>;
  statusMax?: Maybe<SampleStatus>;
  statusMin?: Maybe<SampleStatus>;
  statusValue?: Maybe<SampleStatus>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  Contains the quantity of elements in a stack. */
export type SampleStack = Sample & {
  __typename?: 'SampleStack';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  SampleStatus gives extra information about the sampleValue. For example, if the measure is
 *  only a lower threshold instead of an actual value when greaterThan SampleStatus is set.
 */
export enum SampleStatus {
  ErrorTooClose = 'errorTooClose',
  ErrorTooFar = 'errorTooFar',
  ErrorUnknown = 'errorUnknown',
  GreaterThan = 'greaterThan',
  LessThan = 'lessThan',
  Ok = 'ok'
}

/**  The SampleString object is used to represent a sample that contains a value that is a string. */
export type SampleString = Sample & {
  __typename?: 'SampleString';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['String']>;
};

/**  SampleTemp object is used to represent a sample containing temperature value. */
export type SampleTemp = Sample & {
  __typename?: 'SampleTemp';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  temperature?: Maybe<Scalars['Float']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
};

/**  Sample used to indicate the UpState of a device. Eg. connected/disconnected */
export type SampleUpState = Sample & {
  __typename?: 'SampleUpState';
  key?: Maybe<Scalars['ID']>;
  opaque?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  state?: Maybe<DeviceUpState>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  The SampleUtilization object contains utilization information of an asset.
 *  It indicates the number of child assets in free, occupied or other state (missingInput, unknown, etc.)
 */
export type SampleUtilization = Sample & {
  __typename?: 'SampleUtilization';
  free?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  occupied?: Maybe<Scalars['Int']>;
  other?: Maybe<Scalars['Int']>;
  percentage?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  total?: Maybe<Scalars['Int']>;
  utilization?: Maybe<Scalars['Float']>;
};

/**
 *  The SampleVOC object is used to represent a sample generated from a Volatile Organic
 *  Compound sensor. The value is reported in ppb(eg. 122 parts per billion).
 */
export type SampleVoc = Sample & {
  __typename?: 'SampleVOC';
  equivalentCO2?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  vOC?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**  For some sensor getEquivalentTvoc value can also be available. It is defined in ppm. */
export type SampleVocIndex = Sample & {
  __typename?: 'SampleVOCIndex';
  equivalentTvoc?: Maybe<Scalars['Long']>;
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  vOCIndex?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Long']>;
};

/**
 *  SampleWeight object is used to represent a sample containing weight value. The value it
 *  contains is expressed in kilograms (kg).
 */
export type SampleWeight = Sample & {
  __typename?: 'SampleWeight';
  key?: Maybe<Scalars['ID']>;
  resourceType?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  value?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export enum ServerCategory {
  Cop = 'cop',
  DemoLinkServer = 'demoLinkServer',
  DeveloperLinkServer = 'developerLinkServer',
  FionaLocationServer = 'fionaLocationServer',
  None = 'none',
  PeeringLinkServer = 'peeringLinkServer',
  ProductionLinkServer = 'productionLinkServer',
  TestLinkServer = 'testLinkServer'
}

export type ServiceDefinitionDto = ResourceDto & {
  __typename?: 'ServiceDefinitionDTO';
  accessUri?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  locationId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  serviceRole?: Maybe<ServiceRole>;
  subtype?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  type?: Maybe<Scalars['String']>;
};

/**  Contains information regarding the service provided. */
export type ServiceDetailsDto = ResourceDto & {
  __typename?: 'ServiceDetailsDTO';
  admDomainId?: Maybe<Scalars['String']>;
  brand?: Maybe<Scalars['String']>;
  capiURL?: Maybe<Scalars['String']>;
  cirrusURL?: Maybe<Scalars['String']>;
  configAPIURL?: Maybe<Scalars['String']>;
  copAlternatives?: Maybe<Array<AuthenticationServer>>;
  gatewayType?: Maybe<GatewayType>;
  isEmpty?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  loginState?: Maybe<LoginState>;
  realm?: Maybe<RealmDto>;
  resourceType?: Maybe<Scalars['String']>;
  serverDID?: Maybe<Scalars['String']>;
  serverVersion?: Maybe<Scalars['String']>;
  singleAccount?: Maybe<Scalars['String']>;
  stockURL?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export enum ServiceRole {
  Access = 'ACCESS',
  Admin = 'ADMIN',
  Blocked = 'BLOCKED',
  Transparent = 'TRANSPARENT',
  Unknown = 'UNKNOWN',
  Visible = 'VISIBLE'
}

export enum Severity {
  Error = 'error',
  Healthy = 'healthy',
  Info = 'info',
  Warning = 'warning'
}

/**  ShrekDTO object holds information about a ShrekInstance. */
export type ShrekDto = ResourceDto & {
  __typename?: 'ShrekDTO';
  administrativeDomainId?: Maybe<Scalars['String']>;
  certUserId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  did?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  realmId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  timeModified?: Maybe<Scalars['Long']>;
  webIp?: Maybe<Scalars['String']>;
  webName?: Maybe<Scalars['String']>;
  webPort?: Maybe<Scalars['Int']>;
};

export enum SiUnit {
  Na = 'NA',
  Amps = 'amps',
  Bar = 'bar',
  BeatsPerMinute = 'beatsPerMinute',
  Bits = 'bits',
  Bps = 'bps',
  Bytes = 'bytes',
  Celsius = 'celsius',
  Counts = 'counts',
  Degrees = 'degrees',
  Dollar = 'dollar',
  Dps = 'dps',
  Euro = 'euro',
  Fahrenheit = 'fahrenheit',
  Feet = 'feet',
  Freq = 'freq',
  G = 'g',
  Gallon = 'gallon',
  GigaBps = 'gigaBps',
  GigaByte = 'gigaByte',
  Gram = 'gram',
  GramPerCubicMeter = 'gramPerCubicMeter',
  Hour = 'hour',
  KWatt = 'kWatt',
  Kelvin = 'kelvin',
  KiloBps = 'kiloBps',
  KiloByte = 'kiloByte',
  Kilogram = 'kilogram',
  Kilometer = 'kilometer',
  KilometersPerHour = 'kilometersPerHour',
  Knots = 'knots',
  Kvah = 'kvah',
  Kvarh = 'kvarh',
  Kwh = 'kwh',
  Liter = 'liter',
  MBa = 'mBA',
  MegaBps = 'megaBps',
  MegaByte = 'megaByte',
  Meters = 'meters',
  MetersPerSeconds = 'metersPerSeconds',
  MicroSeconds = 'microSeconds',
  Mile = 'mile',
  MilesPerHour = 'milesPerHour',
  MilliBar = 'milliBar',
  MilliSeconds = 'milliSeconds',
  MillimetersPerHour = 'millimetersPerHour',
  Millimetre = 'millimetre',
  Millinewton = 'millinewton',
  Minutes = 'minutes',
  Mlux = 'mlux',
  NanoSeconds = 'nanoSeconds',
  None = 'none',
  Ohms = 'ohms',
  Onoff = 'onoff',
  Pascal = 'pascal',
  Percent = 'percent',
  Pound = 'pound',
  Ppb = 'ppb',
  Ppm = 'ppm',
  Seconds = 'seconds',
  Sek = 'sek',
  TeraByte = 'teraByte',
  Va = 'va',
  Vars = 'vars',
  Volts = 'volts',
  Watt = 'watt'
}

/**
 *  The object contains the information about sensor values over a time period.
 *  The time period is defined by the SlotSize.
 *  It contains information about the min, max, sum (called aggregateValue) and the number of samples which the sum is based on over the time period.
 *  The aggregateValue is the sum of the sample values.
 *  The maxValueTime is the time of the sample containing the max value.
 *  the minValueTime is the time of the sample containing the min value.
 */
export type SlotDto = Sample & {
  __typename?: 'SlotDTO';
  aggregateValue?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['ID']>;
  maxValue?: Maybe<Scalars['Float']>;
  maxValueTime?: Maybe<Scalars['Long']>;
  minValue?: Maybe<Scalars['Float']>;
  minValueTime?: Maybe<Scalars['Long']>;
  numValues?: Maybe<Scalars['Long']>;
  resourceType?: Maybe<Scalars['String']>;
  slotSize?: Maybe<SlotSize>;
  time?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  This is the definition of slot size. It specifies the time span of a slot. */
export enum SlotSize {
  Day = 'day',
  Hour = 'hour',
  Min10 = 'min10'
}

export type StateCounts = {
  __typename?: 'StateCounts';
  expired: Scalars['Int'];
  installed: Scalars['Int'];
  pending: Scalars['Int'];
  planned: Scalars['Int'];
  skipped: Scalars['Int'];
};

export enum Status {
  Offline = 'OFFLINE',
  Online = 'ONLINE',
  Unknown = 'UNKNOWN'
}

export type SubscribeData = {
  __typename?: 'SubscribeData';
  data: Array<SampleList>;
  locationId: Scalars['String'];
  type: SubscriptionType;
};

export type Subscription = {
  __typename?: 'Subscription';
  subscribeLocation?: Maybe<SubscribeData>;
};


export type SubscriptionSubscribeLocationArgs = {
  locationId: Scalars['String'];
  subscriptionType: SubscriptionType;
};

/**  Contains all possible types of subscriptions someone can request to subscribe to. */
export enum SubscriptionType {
  Any = 'any',
  AssetData = 'assetData',
  AssetSlots = 'assetSlots',
  Battery = 'battery',
  Config = 'config',
  Data = 'data',
  DataChanges = 'dataChanges',
  DataCustom = 'dataCustom',
  Defaults = 'defaults',
  Lifecycle = 'lifecycle',
  LogAny = 'logAny',
  LogError = 'logError',
  NativeClient = 'nativeClient',
  Occupancy = 'occupancy',
  OccupancySlots = 'occupancySlots',
  PositionUpdate = 'positionUpdate',
  RawMessagesRx = 'rawMessagesRx',
  RawMessagesTx = 'rawMessagesTx',
  SensorData = 'sensorData',
  SensorSlots = 'sensorSlots',
  Statistics = 'statistics',
  UnitState = 'unitState',
  Ups = 'ups'
}

/**  Contains all possible access levels a user can have on a per account basis. */
export enum SystemUserAcl {
  Admin = 'admin',
  Installer = 'installer',
  Manager = 'manager',
  Reader = 'reader',
  Writer = 'writer'
}

export type TimeSerieSelectionInput = {
  numberOfSamplesAfterStart?: InputMaybe<Scalars['Int']>;
  numberOfSamplesBeforeStart?: InputMaybe<Scalars['Int']>;
  slotSize?: InputMaybe<SlotSize>;
  timeEnd?: InputMaybe<Scalars['Long']>;
  timeStart?: InputMaybe<Scalars['Long']>;
};

/**  Contains all possible access levels a user can have on a per unit basis. */
export enum UnitAcl {
  Administrator = 'administrator',
  Block = 'block',
  Operator = 'operator',
  Undefined = 'undefined',
  Viewer = 'viewer'
}

/**
 *  UnitAddress object is used to identify a unique unit. It contains a did, a locationId and a
 *  serverDid.
 */
export type UnitAddress = ResourceDto & {
  __typename?: 'UnitAddress';
  did?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  locationAddressKey?: Maybe<Scalars['String']>;
  locationId?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  serverDid?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**  UnitAlarmSetValues. States which can be set to an alarm. */
export enum UnitAlarmSetValues {
  Arm = 'arm',
  Disable = 'disable',
  Reset = 'reset',
  Snooze = 'snooze',
  Trigg = 'trigg'
}

/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDto = ResourceDto & {
  __typename?: 'UnitDTO';
  /**
   *  Get the link stats to all possible parents of this unit
   * @deprecated Preview function, can be removed
   */
  allRadioLinkParents: Array<RadioComStatsDto>;
  /**  Get the topological children */
  assetChildren: Array<UnitDto>;
  /**  Get the topological parent */
  assetParent?: Maybe<UnitDto>;
  /**  Get the chassis children for this unit */
  chassisChildren: Array<UnitDto>;
  chassisDid?: Maybe<Scalars['String']>;
  /**  Get the chassis Unit (Or null, if not avail) */
  chassisParent?: Maybe<UnitDto>;
  /**  List all custom properties. */
  customProperties: Array<CustomPropertyDto>;
  /**  Get a custom property */
  customProperty?: Maybe<CustomPropertyDto>;
  /**  List the datasources available trough this unit */
  dataSources: Array<DataSourceAddress>;
  defaultNameSetBySystem?: Maybe<Scalars['String']>;
  hardwareId?: Maybe<Scalars['String']>;
  isChassis?: Maybe<Scalars['Boolean']>;
  isNameSetByUser?: Maybe<Scalars['Boolean']>;
  isShowInDashboard?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  /**  Get the latest sample for VariableName. if not set, get the default sample. */
  latest?: Maybe<Sample>;
  lifeCycleState?: Maybe<LifeCycleState>;
  /**  Get the name for this unit */
  name: Scalars['String'];
  nameSetByUser?: Maybe<Scalars['String']>;
  /**  Try to get the candidate object */
  ontology?: Maybe<AssetCandidate>;
  productType?: Maybe<Scalars['String']>;
  /**  List properties. */
  properties: Array<UnitProperty>;
  /**  Get the value of the specified property. Some properties can have multiple values. */
  property: Array<UnitProperty>;
  /**  Get the assoc provisioning object */
  provisioning?: Maybe<ProvisioningDto>;
  /**  Get the link stats to the current topological parent of this unit */
  radioLinkParent?: Maybe<RadioComStatsDto>;
  resourceType?: Maybe<Scalars['String']>;
  /**
   *  Get samples for the specified variable name. If no variable name is specified,
   *  then the default variable is selected.
   */
  samples?: Maybe<SampleList>;
  /**  Get the sinks for this unit. */
  sinks: Array<UnitDto>;
  /**
   *  Get slots for the specified variable. Not all variables supports slots, you might use the datasource list
   *  to determine availability.
   */
  slots?: Maybe<Array<SlotDto>>;
  /**  Get the sources for this unit. */
  sources: Array<UnitDto>;
  subunitIdentifier?: Maybe<Scalars['Int']>;
  timeCreated?: Maybe<Scalars['Long']>;
  unitAcl?: Maybe<UnitAcl>;
  unitAddress?: Maybe<UnitAddress>;
  unitTypeConfigured?: Maybe<UnitType>;
  unitTypeFixed?: Maybe<UnitType>;
  /**  Get the type group, e.g. asset, virtual, temp etc. */
  unitTypeGroup: UnitType;
  userId?: Maybe<Scalars['String']>;
};


/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDtoCustomPropertyArgs = {
  propertyName?: InputMaybe<Scalars['String']>;
};


/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDtoLatestArgs = {
  variableName?: InputMaybe<VariableName>;
};


/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDtoPropertyArgs = {
  propertyName?: InputMaybe<PropertyName>;
};


/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDtoSamplesArgs = {
  timeSerieSelection: TimeSerieSelectionInput;
  variableName?: InputMaybe<VariableName>;
};


/**
 *  UnitDTO object holds all information that describe a Yanzi unit. For example, the temp and the
 *  humidity sensors are two units that exist in a Yanzi Climate device. It contains a DataSource
 *  object, the SI Unit it is measured with and the time of generation.
 */
export type UnitDtoSlotsArgs = {
  timeSerieSelection: TimeSerieSelectionInput;
  variableName?: InputMaybe<VariableName>;
};

export type UnitFilterInput = {
  name: MatchName;
  type: MatchType;
  value?: InputMaybe<Scalars['String']>;
};

export type UnitMutation = {
  __typename?: 'UnitMutation';
  /**
   * null
   * Requires user role: manager
   */
  addProperty?: Maybe<PropertyDto>;
  /**
   * null
   * Requires user role: writer
   */
  controlAnalog: ResponseCode;
  /**
   * null
   * Requires user role: writer
   */
  controlBinary: ResponseCode;
  /**
   * null
   * Requires user role: writer
   */
  controlString: ResponseCode;
  /**
   *  Delete this unit
   * Requires user role: admin
   */
  delete: Scalars['Boolean'];
  /**
   * null
   * Requires user role: manager
   */
  removeProperty?: Maybe<PropertyDto>;
  /**
   * null
   * Requires user role: manager
   */
  setCustomProperty: CustomPropertyDto;
  /**
   * null
   * Requires user role: manager
   */
  setPosition?: Maybe<SamplePosition>;
  /**
   * null
   * Requires user role: manager
   */
  setProperty?: Maybe<PropertyDto>;
};


export type UnitMutationAddPropertyArgs = {
  propertyName: PropertyName;
  propertyValue: Scalars['String'];
};


export type UnitMutationControlAnalogArgs = {
  value: Scalars['Float'];
};


export type UnitMutationControlBinaryArgs = {
  value: OutputValue;
};


export type UnitMutationControlStringArgs = {
  value: Scalars['String'];
};


export type UnitMutationRemovePropertyArgs = {
  propertyName: PropertyName;
  propertyValue: Scalars['String'];
};


export type UnitMutationSetCustomPropertyArgs = {
  propertyName: Scalars['String'];
  propertyValue?: InputMaybe<Scalars['String']>;
};


export type UnitMutationSetPositionArgs = {
  position: PositionInput;
};


export type UnitMutationSetPropertyArgs = {
  propertyName: PropertyName;
  propertyValue: Scalars['String'];
};

export enum UnitPhysicalness {
  Physical = 'physical',
  Remote = 'remote',
  Sub = 'sub',
  Unknown = 'unknown',
  Virtual = 'virtual'
}

/**  PropertyDTO specific for indicating a Unit property. */
export type UnitProperty = ResourceDto & {
  __typename?: 'UnitProperty';
  booleanValue?: Maybe<Scalars['Boolean']>;
  doubleValue?: Maybe<Scalars['Float']>;
  integerValue?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  longValue?: Maybe<Scalars['Long']>;
  propertyName?: Maybe<PropertyName>;
  resourceType?: Maybe<Scalars['String']>;
  stringValue?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

/**
 *  Contains all different types of units that can be found and used by the platform. Includes both
 *  physical sensors and different kinds of assets.
 */
export enum UnitType {
  Accelerometer = 'accelerometer',
  AnalogInput = 'analogInput',
  AnalogOutput = 'analogOutput',
  AnalogOutputHeating = 'analogOutputHeating',
  AnalogOutputLamp = 'analogOutputLamp',
  Area = 'area',
  AreaGroup = 'areaGroup',
  Asset = 'asset',
  Battery = 'battery',
  Building = 'building',
  Camera = 'camera',
  CameraSurveillance = 'cameraSurveillance',
  CarbonDioxide = 'carbonDioxide',
  Chair = 'chair',
  CleaningRound = 'cleaningRound',
  ConferenceRoom = 'conferenceRoom',
  ConferenceTable = 'conferenceTable',
  Connection = 'connection',
  Desk = 'desk',
  Dispenser = 'dispenser',
  DispenserGroup = 'dispenserGroup',
  DispenserSoap = 'dispenserSoap',
  DispenserTowel = 'dispenserTowel',
  Distance = 'distance',
  Door = 'door',
  EnergyMeter = 'energyMeter',
  Facility = 'facility',
  Floor = 'floor',
  Footfall = 'footfall',
  Force = 'force',
  Garage = 'garage',
  Gateway = 'gateway',
  GenericDevice = 'genericDevice',
  Gyro = 'gyro',
  HeartRate = 'heartRate',
  Humidity = 'humidity',
  Illuminance = 'illuminance',
  Input = 'input',
  InputEnergyMeter = 'inputEnergyMeter',
  InputLock = 'inputLock',
  InputMetering = 'inputMetering',
  InputMotion = 'inputMotion',
  InputOnOff = 'inputOnOff',
  InputOutput = 'inputOutput',
  InputPowerCut = 'inputPowerCut',
  InputSmoke = 'inputSmoke',
  Lab = 'lab',
  Location = 'location',
  LocationBurglar = 'locationBurglar',
  LocationSmoke = 'locationSmoke',
  Log = 'log',
  OpenClosed = 'openClosed',
  Output = 'output',
  OutputGate = 'outputGate',
  OutputGeneric = 'outputGeneric',
  OutputHeating = 'outputHeating',
  OutputLamp = 'outputLamp',
  OutputLock = 'outputLock',
  OutputSiren = 'outputSiren',
  ParticulateMatter = 'particulateMatter',
  PeopleCounter = 'peopleCounter',
  PhysicalOrChassis = 'physicalOrChassis',
  PowerMeter = 'powerMeter',
  PowerMonitor = 'powerMonitor',
  Pressure = 'pressure',
  Projector = 'projector',
  PulseBand = 'pulseBand',
  Pvx = 'pvx',
  Rain = 'rain',
  RecycleBin = 'recycleBin',
  RemoteGateway = 'remoteGateway',
  Restroom = 'restroom',
  Room = 'room',
  ShedEstablishment = 'shedEstablishment',
  SnowMeter = 'snowMeter',
  SoundClassifier = 'soundClassifier',
  SoundPressureLevel = 'soundPressureLevel',
  Spaceother = 'spaceother',
  Spot = 'spot',
  Stack = 'stack',
  Temp = 'temp',
  TempFreezer = 'tempFreezer',
  TempFridge = 'tempFridge',
  TempHeating = 'tempHeating',
  TempInside = 'tempInside',
  TempOutside = 'tempOutside',
  TempPool = 'tempPool',
  TempSeaWater = 'tempSeaWater',
  TempWater = 'tempWater',
  TempWine = 'tempWine',
  Timer = 'timer',
  Toilet = 'toilet',
  Unknown = 'unknown',
  Virtual = 'virtual',
  VirtualLogic = 'virtualLogic',
  VirtualLostContact = 'virtualLostContact',
  VirtualLostContactLocation = 'virtualLostContactLocation',
  VirtualMotion = 'virtualMotion',
  VirtualSmoke = 'virtualSmoke',
  VirtualSurveillanceNotification = 'virtualSurveillanceNotification',
  VirtualSurveillanceNotificationSmoke = 'virtualSurveillanceNotificationSmoke',
  VirtualThreshold = 'virtualThreshold',
  VirtualThresholdLower = 'virtualThresholdLower',
  VirtualThresholdUpper = 'virtualThresholdUpper',
  VolatileOrganicCompound = 'volatileOrganicCompound',
  VolatileOrganicCompoundIndex = 'volatileOrganicCompoundIndex',
  Washroom = 'washroom',
  Weather = 'weather',
  Wind = 'wind',
  Zone = 'zone'
}

/**  UserDTO object holds all information that describe a user. */
export type UserDto = ResourceDto & {
  __typename?: 'UserDTO';
  /**  Get the capability flags for the specified user. */
  capabilities: Array<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  cliAccess?: Maybe<Scalars['Boolean']>;
  country?: Maybe<Scalars['String']>;
  domains?: Maybe<Array<Scalars['String']>>;
  firstName?: Maybe<Scalars['String']>;
  isCirrusAllowed?: Maybe<Scalars['Boolean']>;
  isCopAdmin?: Maybe<Scalars['Boolean']>;
  isDeveloperAllowed?: Maybe<Scalars['Boolean']>;
  isSupportAllowed?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['ID']>;
  language?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  timeAcceptedTerms?: Maybe<Scalars['Long']>;
  timeCreated?: Maybe<Scalars['Long']>;
  yanziId?: Maybe<Scalars['String']>;
};

/**  PropertyDTO specific for indicating a User property. */
export type UserProperty = ResourceDto & {
  __typename?: 'UserProperty';
  booleanValue?: Maybe<Scalars['Boolean']>;
  doubleValue?: Maybe<Scalars['Float']>;
  integerValue?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['ID']>;
  longValue?: Maybe<Scalars['Long']>;
  propertyName?: Maybe<PropertyName>;
  resourceType?: Maybe<Scalars['String']>;
  stringValue?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
};

export type ValueTypeDto = ResourceDto & {
  __typename?: 'ValueTypeDTO';
  dataType?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  quantityKind?: Maybe<Scalars['String']>;
  resourceType?: Maybe<Scalars['String']>;
  timeCreated?: Maybe<Scalars['Long']>;
  unit?: Maybe<Scalars['String']>;
};

export enum VariableName {
  Acceleration = 'acceleration',
  AlarmState = 'alarmState',
  AngularVelocity = 'angularVelocity',
  AssetUtilization = 'assetUtilization',
  Battery = 'battery',
  BuildingModel = 'buildingModel',
  CarbonDioxide = 'carbonDioxide',
  CostSekPerDay = 'costSekPerDay',
  Counter = 'counter',
  Cstats = 'cstats',
  CurrentL = 'currentL',
  Distance = 'distance',
  DmdTotalPower = 'dmdTotalPower',
  DmdVoltageLtoNSum = 'dmdVoltageLtoNSum',
  EgoneBootRecord = 'egoneBootRecord',
  ElectricalPower = 'electricalPower',
  ElementCount = 'elementCount',
  ExtendedEnergySample = 'extendedEnergySample',
  FileRemoveLog = 'fileRemoveLog',
  Force = 'force',
  HeartRate = 'heartRate',
  HeartRatePeriod = 'heartRatePeriod',
  HeartRateRecievePower = 'heartRateRecievePower',
  Illuminance = 'illuminance',
  Image = 'image',
  ImageSnapshotPresent = 'imageSnapshotPresent',
  LampIntensity = 'lampIntensity',
  LineFrequency = 'lineFrequency',
  LinkUplog = 'linkUplog',
  Log = 'log',
  LogSniffer = 'logSniffer',
  Motion = 'motion',
  OnOffInput = 'onOffInput',
  OnOffOutput = 'onOffOutput',
  OnOffTransition = 'onOffTransition',
  OpenClosed = 'openClosed',
  OperatingHours = 'operatingHours',
  ParticulateMatter = 'particulateMatter',
  PeopleCount = 'peopleCount',
  Percentage = 'percentage',
  PositionLog = 'positionLog',
  Present = 'present',
  Pressure = 'pressure',
  PressureValue = 'pressureValue',
  PulseBand = 'pulseBand',
  PulseBandId = 'pulseBandId',
  PulseBandType = 'pulseBandType',
  Qstatistics = 'qstatistics',
  RainLast24Hour = 'rainLast24Hour',
  RainLastHour = 'rainLastHour',
  RainRate = 'rainRate',
  RawMessagesRx = 'rawMessagesRx',
  RawMessagesTx = 'rawMessagesTx',
  RefillList = 'refillList',
  RelativeHumidity = 'relativeHumidity',
  SampleStatistics = 'sampleStatistics',
  SiteOnlineStatus = 'siteOnlineStatus',
  SlotAggregateValue = 'slotAggregateValue',
  SlotAverageValue = 'slotAverageValue',
  SlotMaxValue = 'slotMaxValue',
  SlotMaxValueTime = 'slotMaxValueTime',
  SlotMinValue = 'slotMinValue',
  SlotMinValueTime = 'slotMinValueTime',
  SlotNumberValues = 'slotNumberValues',
  SoundBackground = 'soundBackground',
  SoundEvents = 'soundEvents',
  SoundPressureLevel = 'soundPressureLevel',
  Statistics = 'statistics',
  Temperature = 'temperature',
  TemperatureC = 'temperatureC',
  TemperatureF = 'temperatureF',
  TemperatureK = 'temperatureK',
  TimeBucket = 'timeBucket',
  TimeDraining = 'timeDraining',
  TimeDuration = 'timeDuration',
  TimeEpoch = 'timeEpoch',
  TotalApparentEnergy = 'totalApparentEnergy',
  Totalenergy = 'totalenergy',
  Totalpower = 'totalpower',
  TotalpowerInst = 'totalpowerInst',
  Undefined = 'undefined',
  UnitState = 'unitState',
  Uplog = 'uplog',
  UpsState = 'upsState',
  VideoBandwith = 'videoBandwith',
  VideoFilePresent = 'videoFilePresent',
  VolatileOrganicCompound = 'volatileOrganicCompound',
  VolatileOrganicCompoundIndex = 'volatileOrganicCompoundIndex',
  Volt = 'volt',
  VoltageL = 'voltageL',
  VoltageLtoNSum = 'voltageLtoNSum',
  WattsL = 'wattsL',
  Weight = 'weight',
  WindDirection = 'windDirection',
  WindSpeedAvg = 'windSpeedAvg',
  WindSpeedGust = 'windSpeedGust'
}

/**  Describes what kind of version is a software product running with. */
export enum VersionType {
  Ld = 'LD',
  Rc = 'RC',
  Beta = 'beta',
  Dev = 'dev',
  Pre = 'pre',
  Unknown = 'unknown'
}

/**  A warning that was generated while parsing the ontology file */
export type Warning = {
  __typename?: 'Warning';
  message: Scalars['String'];
  offender?: Maybe<AssetCandidate>;
};

export type GetDataSourceAddressQueryVariables = Exact<{
  locationId: Scalars['String'];
  did: Scalars['String'];
}>;


export type GetDataSourceAddressQuery = { __typename?: 'Query', location?: { __typename?: 'LocationDTO', gateway?: { __typename?: 'UnitDTO', unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined } | null | undefined, unit?: { __typename?: 'UnitDTO', name: string, productType?: string | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined, dataSources: Array<{ __typename?: 'DataSourceAddress', variableName?: VariableName | null | undefined, siUnit?: SiUnit | null | undefined }>, chassisParent?: { __typename?: 'UnitDTO', unitTypeFixed?: UnitType | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined };

export type GetLocationUnitsQueryVariables = Exact<{
  locationId: Scalars['String'];
}>;


export type GetLocationUnitsQuery = { __typename?: 'Query', location?: { __typename?: 'LocationDTO', locationId?: string | null | undefined, gateway?: { __typename?: 'UnitDTO', nameSetByUser?: string | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined, dataSources: Array<{ __typename?: 'DataSourceAddress', variableName?: VariableName | null | undefined, siUnit?: SiUnit | null | undefined }> } | null | undefined, units: { __typename?: 'PaginatedUnitDTO', list: Array<{ __typename?: 'UnitDTO', nameSetByUser?: string | null | undefined, chassisParent?: { __typename?: 'UnitDTO', name: string, productType?: string | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined } | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined, dataSources: Array<{ __typename?: 'DataSourceAddress', variableName?: VariableName | null | undefined, siUnit?: SiUnit | null | undefined }> }> }, inventory?: { __typename?: 'InventoryListDTO', list?: Array<{ __typename?: 'InventoryItemDTO', version?: string | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined }> | null | undefined } | null | undefined } | null | undefined };

export type GetUnitQueryVariables = Exact<{
  locationId: Scalars['String'];
  did: Scalars['String'];
}>;


export type GetUnitQuery = { __typename?: 'Query', location?: { __typename?: 'LocationDTO', gateway?: { __typename?: 'UnitDTO', unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined } | null | undefined, unit?: { __typename?: 'UnitDTO', unitTypeFixed?: UnitType | null | undefined, name: string, nameSetByUser?: string | null | undefined, productType?: string | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined, dataSources: Array<{ __typename?: 'DataSourceAddress', variableName?: VariableName | null | undefined, siUnit?: SiUnit | null | undefined }>, chassisParent?: { __typename?: 'UnitDTO', name: string, unitTypeFixed?: UnitType | null | undefined, unitAddress?: { __typename?: 'UnitAddress', did?: string | null | undefined } | null | undefined } | null | undefined } | null | undefined } | null | undefined };


export const GetDataSourceAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDataSourceAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"did"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateway"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"did"},"value":{"kind":"Variable","name":{"kind":"Name","value":"did"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"dataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variableName"}},{"kind":"Field","name":{"kind":"Name","value":"siUnit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chassisParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitTypeFixed"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDataSourceAddressQuery, GetDataSourceAddressQueryVariables>;
export const GetLocationUnitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLocationUnits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locationId"}},{"kind":"Field","name":{"kind":"Name","value":"gateway"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nameSetByUser"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variableName"}},{"kind":"Field","name":{"kind":"Name","value":"siUnit"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"units"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10000"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chassisParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"nameSetByUser"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variableName"}},{"kind":"Field","name":{"kind":"Name","value":"siUnit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"inventory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLocationUnitsQuery, GetLocationUnitsQueryVariables>;
export const GetUnitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUnit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"did"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateway"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"did"},"value":{"kind":"Variable","name":{"kind":"Name","value":"did"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitTypeFixed"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"nameSetByUser"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"productType"}},{"kind":"Field","name":{"kind":"Name","value":"dataSources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variableName"}},{"kind":"Field","name":{"kind":"Name","value":"siUnit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chassisParent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"unitAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"did"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unitTypeFixed"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUnitQuery, GetUnitQueryVariables>;