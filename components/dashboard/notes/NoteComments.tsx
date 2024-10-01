import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import { Colors } from "@/constants";
import { ResultNoteCommentsDto, ResultUserDto } from "@/types";
import { Image, StyleSheet } from "react-native";

export type NoteCommentsProps = {
  comments: ResultNoteCommentsDto[];
  user: ResultUserDto | null;
};

export function NoteComments({ comments }: NoteCommentsProps) {
  //
  return (
    <>
      {comments?.map((item, index) => (
        <ThemedView
          lightColor="#eee"
          darkColor={Colors.secondaryDark}
          style={[styles.itemBox]}
          key={index}
        >
          <Image
            source={require("@/assets/images/parallax/services.webp")}
            style={styles.itemUserPhoto}
          />
          <ThemedView style={{ backgroundColor: "transparent", flex: 1 }}>
            <ThemedText type="small" style={styles.itemUserName}>
              {item.user.firstname} {item.user.lastname}
            </ThemedText>
            <ThemedText type="medium">{item.content}</ThemedText>
            <ThemedText type="small" style={styles.itemFlag}>
              {new Date(`${item.created_at}`).toDateString()}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
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
  itemBox: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 5,
    gap: 10,
    marginBottom: 5,
    marginHorizontal: 5
  },
  itemUserName: {
    textTransform: "capitalize",
    fontWeight: "700",
  },
  itemUserPhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    objectFit: "cover",
  },
  itemFlag: {
    position: "absolute",
    right: 5,
    top: 0,
  },
});
