import { ThemedButton } from "@/components/common/ThemedButton";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { ResultServiceDto, ResultUserDto } from "@/types";
import { useTranslation } from "react-i18next";
import { StyleSheet, useColorScheme } from "react-native";

export type ServiceDetailsProps = {
  item: ResultServiceDto;
  user: ResultUserDto | null;
  proceedConfirm: () => void;
  proceedCancel: () => void;
};

export function ServiceDetails({
  item,
  user,
  proceedConfirm,
}: ServiceDetailsProps) {
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
            {t("services.details.ref")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.ref}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.type")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.type.name}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.location")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.country}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.user")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {item.user.firstname} - {item.user.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.agent")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {item.agent?.firstname} - {item.agent?.lastname}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.booking_date")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {new Date(item.booking_date).toDateString()}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.lineContainer, dynamicStyles.lineContainer]}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.date_created")}
          </ThemedText>
          <ThemedText style={styles.lineText}>
            {new Date(item.created_at).toDateString()}
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ marginTop: 10 }}>
          <ThemedText style={styles.lineTextKey}>
            {t("services.details.details")}
          </ThemedText>
          <ThemedText style={styles.lineText}>{item.details}</ThemedText>
        </ThemedView>
      </ThemedView>

      {!item.agent?.id && user?.id != item.user.id && (
        <>
          <ThemedView style={styles.containerFooter}>
            <ThemedButton
              onPress={proceedConfirm}
              style={[styles.addButtonContainer]}
              title={t("services.details.confirm")}
            />
          </ThemedView>
        </>
      )}
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
