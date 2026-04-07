import type { Profile } from "../../lib/types";

type ProfileCardProps = {
  profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="h-24 w-24 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p>
          <span className="font-semibold">Phone:</span> {profile.phone}
        </p>
        <p>
          <span className="font-semibold">Bio:</span> {profile.bio}
        </p>
      </div>
    </div>
  );
}