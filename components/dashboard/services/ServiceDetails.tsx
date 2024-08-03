import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultServiceDto } from "@/types";
import { StyleSheet, useColorScheme } from "react-native";

export type ServiceDetailsProps = {
  item: ResultServiceDto;
};

export function ServiceDetails({ item }: ServiceDetailsProps) {
  const theme = useColorScheme();

  const dynamicStyles = {
    lineContainer: {
      borderColor: theme == "dark" ? "#222" : "#ddd",
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Ref</ThemedText>
        <ThemedText style={styles.lineText}>{item.ref}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Type</ThemedText>
        <ThemedText style={styles.lineText}>{item.type.name}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Location</ThemedText>
        <ThemedText style={styles.lineText}>{item.country}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>User</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.user.firstname} - {item.user.lastname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Agent</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.agent?.firstname} - {item.agent?.lastname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Request Date</ThemedText>
        <ThemedText style={styles.lineText}>
          {new Date(item.booking_date).toDateString()}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Date Created</ThemedText>
        <ThemedText style={styles.lineText}>
          {new Date(item.created_at).toDateString()}
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ marginTop: 10 }}>
        <ThemedText style={styles.lineTextKey}>Details</ThemedText>
        <ThemedText style={styles.lineText}>{item.details}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  lineContainer: {
    flexDirection: "row",
    gap: 1,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
  lineTextKey: {
    flex: 0.6,
    fontWeight: 700,
  },
  lineText: {
    flex: 1,
  },
});
