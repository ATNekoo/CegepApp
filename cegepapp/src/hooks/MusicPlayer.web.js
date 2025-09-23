import React, { useContext } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function SongPlayerModal({ visible, onClose, videoId, title }) {
  const { colors } = useContext(ThemeContext);
  const youtubeUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.object, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

          {videoId ? (
            <div style={{ width: "100%", height: 500 }}>
              <iframe
                title={title || "YouTube video"}
                src={youtubeUrl}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 8, borderWidth: 2, borderColor: colors.border }}
              />
            </div>
          ) : (
            <Text style={[styles.noVideo, { color: colors.text }]}>No video available</Text>
          )}

          <TouchableOpacity
            onPress={onClose}
            style={[styles.button, { backgroundColor: colors.background, borderColor: colors.border }]}
          >
            <Text style={[styles.text, { color: colors.text }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modal: {
    width: "90%",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  noVideo: {
    textAlign: "center",
    marginVertical: 20,
  },
  button: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});
