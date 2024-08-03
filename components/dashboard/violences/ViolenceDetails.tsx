import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultViolenceDto } from "@/types";
import { StyleSheet, useColorScheme } from "react-native";

export type ViolenceDetailsProps = {
  item: ResultViolenceDto;
};

export function ViolenceDetails({ item }: ViolenceDetailsProps) {
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
        <ThemedText style={styles.lineTextKey}>Nature</ThemedText>
        <ThemedText style={styles.lineText}>{item.nature}</ThemedText>
      </ThemedView>
      {/* <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Nature</ThemedText>
        <ThemedText style={styles.lineText}>{item.}</ThemedText>
      </ThemedView> */}
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Type</ThemedText>
        <ThemedText style={styles.lineText}>{item.types.name}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Flag</ThemedText>
        <ThemedText style={styles.lineText}>{item.flags.name}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Place</ThemedText>
        <ThemedText style={styles.lineText}>{item.natureLocation}</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Location</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.country}, {item.city}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Victim</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.users.firstname} {item.users.lastname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Added By</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.author.firstname} {item.author.lastname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Agent</ThemedText>
        <ThemedText style={styles.lineText}>
          {item.agent.firstname} {item.agent.lastname}
        </ThemedText>
      </ThemedView>
      <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
        <ThemedText style={styles.lineTextKey}>Date Occurred</ThemedText>
        <ThemedText style={styles.lineText}>
          {new Date(item.date_occured).toDateString()}
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
