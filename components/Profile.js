import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function Profile({ onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.profileWrapper}>
      <TouchableOpacity onPress={handleToggleDropdown} style={styles.profileContainer}>
        <Image 
          style={styles.profileImage}
          source={{ uri: 'https://via.placeholder.com/40' }} 
        />
        <Text style={styles.profileName}>User1</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdownMenu}>
          <Text style={styles.dropdownItem} onPress={onLogout}>Logout</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profileWrapper: {
    position: 'relative',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    color: 'white',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#1e1e1e',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    width: 150,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    color: 'white',
    cursor: 'pointer',
  },
});

export default Profile;
