// Import redirecting via Authentication context and tab navigator
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Loading } from "../../components/common/Loading/Loading";
import { useAuth } from "../../contexts/AuthContext";

// Create tab layout component that checks authentication state
export default function TabsLayout() {
  // Access user and loading state from authentication context
  const { user, loading } = useAuth();

  // Show loading indicator while checking authentication state
  if (loading) return <Loading fullScreen text="Loading..." />;

  // Redirect to authentication screen if user is not logged in
  if (!user) {
    return <Redirect href="../(auth)" />;
  }

  // Render tab navigator if user is authenticated
  return (
    <NativeTabs tintColor="#FF3C38">
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon
          sf={{
            default: "house",
            selected: "house.fill",
          }}
          drawable="ic_home_black_24dp"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="events">
        <Icon
          sf={{
            default: "party.popper",
            selected: "party.popper.fill",
          }}
          drawable="ic_event_note_black_24dp"
        />
        <Label>Events</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="swipe">
        <Icon
          sf={{
            default: "plus.square.on.square",
            selected: "plus.square.fill.on.square.fill",
          }}
          drawable="ic_layers_black_24dp"
        />
        <Label>Swipe</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="chat">
        <Icon
          sf={{
            default: "text.bubble",
            selected: "text.bubble.fill",
          }}
          drawable="ic_chat_bubble_black_24dp"
        />
        <Label>Chat</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon
          sf={{
            default: "person",
            selected: "person.fill",
          }}
          drawable="ic_person_black_24dp"
        />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
