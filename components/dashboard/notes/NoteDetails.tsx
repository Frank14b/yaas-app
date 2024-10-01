import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultNoteDto, ResultUserDto } from "@/types";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme } from "react-native";

export type NoteDetailsProps = {
  item: ResultNoteDto;
  user: ResultUserDto | null;
};

export function NoteDetails({
  item,
}: NoteDetailsProps) {
  //
  const { t } = useTranslation();
  const theme = useColorScheme();

  const dynamicStyles = {
    lineContainer: {
      borderColor: theme == "dark" ? "#222" : "#ddd",
    },
  };

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.ref")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.ref}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.type")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.types.name}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.flag")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.flags.name}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.user")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {item.users.firstname} - {item.users.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.date_created")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {new Date(item.created_at).toDateString()}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("notes.details.details")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.details}</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
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
  containerFooter: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 20,
  },
  addButtonContainer: {
    backgroundColor: "green",
  },
  cancelButtonContainer: {
    backgroundColor: "red",
  },
});
