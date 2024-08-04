import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultViolenceDto } from "@/types";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme } from "react-native";

export type ViolenceDetailsProps = {
  item: ResultViolenceDto;
};

export function ViolenceDetails({ item }: ViolenceDetailsProps) {
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
          <ThemedText style={styles.lineTextKey}>{t("violences.details.ref")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.ref}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.nature")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.nature}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.type")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.types.name}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.flag")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.flags.name}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.place")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.natureLocation}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.location")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {item.country}, {item.city}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.victim")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {item.users.firstname} {item.users.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.added_by")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {item.author.firstname} {item.author.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.agent")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {item.agent.firstname} {item.agent.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.date_occurred")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {new Date(item.date_occured).toDateString()}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.date_created")}</ThemedText>
          <ThemedText style={styles.lineText}>
            {new Date(item.created_at).toDateString()}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ marginTop: 10 }}>
          <ThemedText style={styles.lineTextKey}>{t("violences.details.details")}</ThemedText>
          <ThemedText style={styles.lineText}>{item.details}</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.containerFooter}>
        <ThemedButton
          style={styles.addButtonContainer}
          onPress={() => router.push(`(forms)/investigation?noticeId=${item.id}`)}
          title={t("violences.details.add_doc")}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    height: "100%",
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
  addButtonContainer: {}
});
