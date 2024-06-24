export type OwnedItem = EntitlementByType;

export type EntitlementByType = {
    ItemTypeID: string;
    Entitlements: Entitlements
};

export type Entitlement = {
    /** UUID */
    TypeID: string;
    /** Item ID */
    ItemID: string;
    /** UUID */
    InstanceID?: string | undefined;
};

export type Entitlements = Entitlement[];
