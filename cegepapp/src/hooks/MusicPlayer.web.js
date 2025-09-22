import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
 
export default function SongPlayerModal({ visible, onClose, videoId, title }) {
  const youtubeUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
 
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>
 
          {videoId ? (
            <div style={{ width: "100%", height: 600 }}>
              <iframe
                title={title || "YouTube video"}
                src={youtubeUrl}
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: 8, borderWidth: 2, borderColor:"#93deff" }}
              />
            </div>
          ) : (
            <Text style={styles.noVideo}>No video available</Text>
          )}
 
          <TouchableOpacity
            onPress={() => {
              if (videoId) window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
            }}
            style={styles.button}
          >
            <Text style={styles.text}>Open on YouTube</Text>
          </TouchableOpacity>
 
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.text}>Close</Text>
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
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    modal: { 
        width: "90%", 
        backgroundColor: "#606470", 
        borderRadius: 12, 
        padding: 16, 
        borderWidth: 2, 
        borderColor: "#93deff" 
    },
    title: { 
        fontSize: 18, 
        fontWeight: "600", 
        marginBottom: 12, 
        color: "#f7f7f7", 
        textAlign: "center" 
    },
    noVideo: { 
        color: "#f7f7f7", 
        textAlign: "center", 
        marginVertical: 20 
    },
    button: { 
        marginTop: 12, 
        padding: 12, 
        borderRadius: 8, 
        backgroundColor: "#323643",
        borderWidth: 2,
        borderColor: "#93deff", 
        alignItems: "center" 
    },
    text: { 
        color: "#f7f7f7", 
        fontSize: 14, 
        fontWeight: "500" 
    },
});