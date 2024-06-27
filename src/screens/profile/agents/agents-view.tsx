import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
// api
import valorantProvider from "@/api/valorant-provider";
import { useGetAgentsQuery } from "@/api/rtk-valorant-api";
// components
import SvgLock from "@/components/icon/lock";
import SvgCheck from "@/components/icon/check";
import Text from "@/components/typography/text";
import Loading from "@/components/loading/loading";
// contexts
import useThemeContext from "@/contexts/hook/use-theme-context";
import useProfileContext from "@/contexts/hook/use-profile-context";
// screens
import AgentCard from "@/screens/profile/agents/agent-card";
// types
import { Agent } from "@/types/api/agent";

const WIDTH = Dimensions.get("window").width;

const AgentsView = () => {

    const { setOwnedAgents, ownedAgents } = useProfileContext();

    const [agentIndex, setAgentIndex] = useState(0);

    const { colors } = useThemeContext();

    const { data: agentsData, isLoading: isAgentsLoading } = useGetAgentsQuery(undefined);

    const fetchAgents = useCallback(async () => {
        const agent = await valorantProvider.getOwnedItems("01bb38e1-da47-4e6a-9b3d-945fe4655707");
        setOwnedAgents(agent);
    }, [setOwnedAgents]);

    useEffect(() => {
        (async () => fetchAgents())();
    }, [fetchAgents]);

    if (isAgentsLoading || !agentsData) return <Loading />;

    const agents = agentsData.data;

    const renderAgentItem = ({ item, index }: { item: Agent, index: number }) => (
        <AgentCard
            index={index}
            key={item.uuid}
            agentIndex={agentIndex}
            displayIcon={item.displayIcon}
            onPress={() => setAgentIndex(index)}
            owned={ownedAgents?.Entitlements.some((agent) => agent.ItemID === item.uuid) || item.isBaseContent}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.agentInfo}>
                <View style={styles.agentInfoOverlay}>
                    <Text variant="displayMedium" style={styles.agentName}>
                        {agents[agentIndex].displayName}
                    </Text>
                    <View style={styles.ownershipStatus}>
                        {ownedAgents?.Entitlements.some((agent) => agent.ItemID === agents[agentIndex].uuid) || agents[agentIndex].isBaseContent ? (
                            <>
                                <SvgCheck color="white" width={24} height={24} />
                                <Text variant="titleMedium">Owned</Text>
                            </>
                        ) : (
                            <>
                                <SvgLock color="white" width={24} height={24} />
                                <Text variant="titleMedium">Not owned</Text>
                            </>
                        )}
                    </View>
                    <View style={[styles.agentRoleContainer, { backgroundColor: colors.card }]}>
                        <Image
                            style={styles.roleIcon}
                            source={{ uri: agents[agentIndex].role.displayIcon }}
                        />
                        <Text variant="titleMedium">
                            {agents[agentIndex].role.displayName}
                        </Text>
                    </View>
                </View>
                <Image
                    style={[styles.agentPortrait, { width: WIDTH }]}
                    source={{ uri: agents[agentIndex].fullPortrait }}
                />
                <Image
                    style={styles.agentBackground}
                    source={{ uri: agents[agentIndex].background }}
                />
            </View>
            <View style={[styles.agentListContainer, { backgroundColor: colors.background }]}>
                <FlatList
                    horizontal
                    data={agents}
                    overScrollMode="never"
                    renderItem={renderAgentItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.uuid}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        flexDirection: "column",
    },
    agentInfo: {
        flex: 1,
        padding: 8,
        overflow: "hidden",
        position: "relative",
        flexDirection: "column",
    },
    agentInfoOverlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        position: "absolute",
        paddingHorizontal: 8,
    },
    agentName: {
        fontFamily: "Vandchrome",
    },
    ownershipStatus: {
        gap: 8,
        alignItems: "center",
        flexDirection: "row",
    },
    agentRoleContainer: {
        gap: 8,
        left: 8,
        bottom: 0,
        padding: 8,
        zIndex: 100,
        display: "flex",
        borderRadius: 16,
        position: "absolute",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    roleIcon: {
        width: 24,
        height: 24,
    },
    agentPortrait: {
        height: "100%",
    },
    agentBackground: {
        zIndex: -1,
        width: WIDTH,
        opacity: 0.2,
        height: "100%",
        position: "absolute",
    },
    agentListContainer: {
        bottom: 0,
        paddingVertical: 8,
    },
    flatListContent: {
        gap: 16,
        paddingHorizontal: 8,
    },
});

export default React.memo(AgentsView);
