import { SavedProfile } from "@/types";
import { useRemoveSavedProfile } from "@/hooks/useSavedProfiles";
import { useToast } from "@/hooks/use-toast";

interface SavedProfileCardProps {
  profile: SavedProfile;
}

export default function SavedProfileCard({ profile }: SavedProfileCardProps) {
  const { mutate: removeSavedProfile, isPending } = useRemoveSavedProfile();
  const { toast } = useToast();

  const handleRemove = () => {
    removeSavedProfile(profile.id, {
      onSuccess: () => {
        toast({
          title: "Profile removed",
          description: "The profile has been removed from your saved list",
        });
      },
      onError: () => {
        toast({
          title: "Failed to remove profile",
          description: "There was an error removing the profile. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  // Generate a consistent avatar fallback for profiles without avatars
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get platform icon
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'ri-instagram-line';
      case 'youtube': return 'ri-youtube-line';
      case 'twitter': return 'ri-twitter-x-line';
      case 'facebook': return 'ri-facebook-circle-line';
      default: return 'ri-global-line';
    }
  };

  return (
    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
      {profile.avatarUrl ? (
        <img 
          src={profile.avatarUrl} 
          alt={profile.name} 
          className="h-10 w-10 rounded-full object-cover"
          onError={(e) => {
            // If image fails to load, replace with fallback
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLElement).parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300';
              fallback.textContent = getInitials(profile.name);
              parent.appendChild(fallback);
            }
          }}
        />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300">
          {getInitials(profile.name)}
        </div>
      )}
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{profile.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          @{profile.username} • <i className={`${getPlatformIcon(profile.platform)} align-bottom`}></i> {profile.platform}
        </p>
      </div>
      <button 
        className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        onClick={handleRemove}
        disabled={isPending}
      >
        <i className="ri-bookmark-fill text-primary-600 dark:text-primary-500"></i>
      </button>
    </div>
  );
}
