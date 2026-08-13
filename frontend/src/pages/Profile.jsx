import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import Navbar from "../components/Navbar";
import InteractiveBackground from "../components/InteractiveBackground";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [uploading, setUploading] =
  useState(false);

const [formData, setFormData] = useState({
  headline: "",
  bio: "",
  phone: "",
  location: "",
  university: "",
  degree: "",
  graduation_year: "",
  github_username: "",
  leetcode_username: "",
  linkedin_url: "",
  portfolio_url: "",
  skills: "",
  interests: "",
  avatar_url: "",
  banner_url: "",
});
  useEffect(() => {

    if (!user) return;

    fetchProfile();

  }, [user]);

  const fetchProfile = async () => {

    try {

      const res =
        await axios.get(
          `http://localhost:8000/api/profile/${user.id}`
        );

      setProfile(res.data);

      setFormData({
      headline: res.data.headline || "",
      bio: res.data.bio || "",
      phone: res.data.phone || "",
      location: res.data.location || "",
      university: res.data.university || "",
      degree: res.data.degree || "",
      graduation_year: res.data.graduation_year || "",
      github_username: res.data.github_username || "",
      leetcode_username: res.data.leetcode_username || "",
      linkedin_url: res.data.linkedin_url || "",
      portfolio_url: res.data.portfolio_url || "",
      skills: res.data.skills || "",
      interests: res.data.interests || "",
      avatar_url: res.data.avatar_url || "",
      banner_url: res.data.banner_url || "",
    });

    } catch (err) {

      console.log(err);

    }
  };


  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const calculateCompletion = () => {
  if (!profile) return 0;

  const fields = [
    profile.headline,
    profile.bio,
    profile.phone,
    profile.location,
    profile.university,
    profile.degree,
    profile.graduation_year,
    profile.github_username,
    profile.leetcode_username,
    profile.linkedin_url,
    profile.portfolio_url,
    profile.skills,
    profile.interests,
    profile.avatar_url,
    profile.banner_url,
  ];

  const completed = fields.filter(
    (field) =>
      field !== null &&
      field !== undefined &&
      String(field).trim() !== ""
  ).length;

  return Math.round((completed / fields.length) * 100);
};


const saveProfile = async () => {
  try {
    await axios.put(
      `http://localhost:8000/api/profile/${user.id}`,
      formData
    );

    setEditing(false);

    fetchProfile();

  } catch (err) {
    console.log(err);
  }
};

  if (!profile) {
    return (
      <div>
        <Navbar />
      </div>
    );
  }

const uploadAvatar = async (file) => {

  try {

    setUploading(true);

    const data = new FormData();

    data.append("file", file);

    const res = await axios.post(
      "http://localhost:8000/api/upload/avatar",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await axios.put(
      `http://localhost:8000/api/profile/${user.id}`,
      {
        ...formData,
        avatar_url: res.data.url,
      }
    );

    fetchProfile();

  } catch (err) {

    console.log(err);

  } finally {

    setUploading(false);

  }

};


const uploadBanner = async (file) => {

  try {

    setUploading(true);

    const data = new FormData();

    data.append("file", file);

    const res = await axios.post(
      "http://localhost:8000/api/upload/banner",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    await axios.put(
      `http://localhost:8000/api/profile/${user.id}`,
      {
        ...formData,
        banner_url: res.data.url,
      }
    );

    fetchProfile();

  } catch (err) {

    console.log(err);

  } finally {

    setUploading(false);

  }

};


const deleteAvatar = async () => {
  try {
    await axios.put(
      `http://localhost:8000/api/profile/${user.id}`,
      {
        ...formData,
        avatar_url: "",
      }
    );

    setProfile({
      ...profile,
      avatar_url: "",
    });

    setFormData({
      ...formData,
      avatar_url: "",
    });

  } catch (err) {
    console.log(err);
  }
};

const deleteBanner = async () => {
  try {
    await axios.put(
      `http://localhost:8000/api/profile/${user.id}`,
      {
        ...formData,
        banner_url: "",
      }
    );

    setProfile({
      ...profile,
      banner_url: "",
    });

    setFormData({
      ...formData,
      banner_url: "",
    });

  } catch (err) {
    console.log(err);
  }
};

const profileCompletion = calculateCompletion();

return (
  <div className="min-h-screen bg-slate-50 relative overflow-hidden">

    <InteractiveBackground />

    <Navbar />

    <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">

{/* Banner */}

<div
  className="
    h-[260px]
    rounded-3xl
    relative
    overflow-visible
    shadow-xl

  "
>

  {/* Banner Image */}

 <div className="w-full h-full rounded-t-3xl overflow-hidden">

  {profile.banner_url ? (

    <img
      src={`http://localhost:8000${profile.banner_url}`}
      alt="Banner"
      className="w-full h-full object-cover"
    />

  ) : (

    <div
      className="
        w-full
        h-full
        bg-gradient-to-r
        from-sky-500
        via-blue-500
        to-indigo-600
      "
    />

  )}

</div>

  {/* Hidden Banner Upload */}

  <input
    type="file"
    id="bannerUpload"
    hidden
    accept="image/*"
    onChange={(e) => {

      const file =
        e.target.files[0];

      if (file) {

        uploadBanner(file);

      }

    }}
  />


    {/* Hidden Avatar Upload */}

  <input
    type="file"
    id="avatarUpload"
    hidden
    accept="image/*"
    onChange={(e) => {

      const file =
        e.target.files[0];

      if (file) {

        uploadAvatar(file);

      }

    }}
  />



  {/* Avatar */}

<div
  className="
    absolute
    left-8
    bottom-[-55px]
    w-36
    h-36
    rounded-full
    border-[6px]
    border-white
    bg-white
    shadow-[0_20px_50px_rgba(0,0,0,.25)]
    overflow-hidden
    z-30
"
>

{profile.avatar_url &&
profile.avatar_url.trim() !== "" ? (

    <img
        src={`http://localhost:8000${profile.avatar_url}`}
        alt="Avatar"
        className="w-full h-full object-cover"
    />

) : (

    <div className="w-full h-full flex items-center justify-center bg-sky-100">
        <span className="text-6xl font-bold text-sky-600">
            {profile.full_name.charAt(0)}
        </span>
    </div>

)}

    <div
        className="
            absolute
            inset-0
            rounded-full
            ring-4
            ring-white/60
        "
    />

</div>
</div>
{/* Main Card */}

<div
  className="
    bg-white
    rounded-b-3xl
    shadow-xl
    px-12
    pt-28
    pb-10
    -mt-6
    relative
    z-10
  "
>

  <div className="flex items-end justify-between">

    {/* Left */}

    <div className="ml-1">

      <h1 className="text-4xl font-bold text-slate-900">
        {profile.full_name}
      </h1>

      <p className="mt-3 text-xl text-slate-700">
        {profile.headline || "Add a professional headline"}
      </p>

      <p className="mt-3 text-slate-500">
        📍 {profile.location || "Location not added"}
      </p>

      <p className="mt-1 text-slate-500">
        ✉ {profile.email}
      </p>

    </div>

    {/* Right */}

    <div className="flex items-start">

      <button
        onClick={() => setEditing(true)}
        className="
          px-8
          py-3
          rounded-xl
          border
          border-sky-500
          bg-sky-500
          hover:bg-sky-600
          text-white
          font-semibold
          shadow-lg
          transition
        "
      >
        Edit Profile
      </button>

    </div>

  </div>

</div>
        {/* About */}

        <div
          className="
            mt-8
            bg-white
            rounded-3xl
            shadow-md
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-4
            "
          >
            About
          </h2>

          <p
            className="
              text-slate-600
              leading-relaxed
            "
          >
            {profile.bio ||
              "No bio added yet."}
          </p>

        </div>
        

       {/* Contact Information */}

        <div className="mt-8 bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <p>{profile.email}</p>
            </div>

            <div>
              <p className="text-gray-500">
                Phone
              </p>

              <p>
                {profile.phone || "Not Added"}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-6">

  <div className="flex justify-between items-center">

    <span className="text-sm font-semibold text-slate-700">
      Profile Completion
    </span>

    <span className="text-sm font-bold text-sky-600">
      {profileCompletion}%
    </span>

  </div>

  <div className="mt-3 w-full h-3 bg-slate-200 rounded-full overflow-hidden">

    <div
      className="
        h-full
        bg-gradient-to-r
        from-sky-500
        to-blue-600
        transition-all
        duration-700
      "
      style={{
        width: `${profileCompletion}%`,
      }}
    />

  </div>

</div>

<div className="mt-4 text-sm text-slate-500">

  {profileCompletion < 40 && (
    <p>💡 Add your bio, education and profile picture.</p>
  )}

  {profileCompletion >= 40 && profileCompletion < 70 && (
    <p>🚀 Connect GitHub, LeetCode and LinkedIn.</p>
  )}

  {profileCompletion >= 70 && profileCompletion < 100 && (
    <p>✨ Almost done! Complete the remaining fields.</p>
  )}

  {profileCompletion === 100 && (
    <p className="text-green-600 font-semibold">
      🎉 Your profile is 100% complete.
    </p>
  )}

</div>  
            
    {/* Education */}
    
         <div className="mt-8 bg-white rounded-3xl shadow-md p-8">

        <h2 className="text-2xl font-bold mb-6">
          Education
        </h2>

        <div className="space-y-3">

          <p>
            <strong>University:</strong>{" "}
            {profile.university || "Not Added"}
          </p>

          <p>
            <strong>Degree:</strong>{" "}
            {profile.degree || "Not Added"}
          </p>

          <p>
            <strong>Graduation:</strong>{" "}
            {profile.graduation_year || "Not Added"}
          </p>

        </div>

      </div>



        {/* Coding Profiles */}

        <div
  className="
    mt-8
    bg-white
    rounded-3xl
    shadow-md
    p-8
  "
>

  <h2
    className="
      text-2xl
      font-bold
      mb-6
    "
  >
    Connected Profiles
  </h2>

  <div className="grid md:grid-cols-3 gap-4">

    {/* LeetCode */}

    <div
      className="
        border
        rounded-2xl
        p-5
        hover:shadow-lg
        transition
      "
    >

      <div className="flex justify-between items-center">

<h3 className="font-semibold text-lg">

LeetCode

</h3>

{profile.leetcode_username && (

<span
className="
px-3
py-1
rounded-full
bg-green-100
text-green-700
text-sm
"
>

Connected

</span>

)}

</div>

      {profile.leetcode_username ? (
        <>
          <p className="text-green-600 mt-2">
            ✓ Connected
          </p>

          <a
            href={`https://leetcode.com/${profile.leetcode_username}`}
            target="_blank"
            rel="noreferrer"
            className="
              text-sky-600
              mt-3
              inline-block
            "
          >
            View Profile →
          </a>
        </>
      ) : (
        <p className="text-red-500 mt-2">
          Not Connected
        </p>
        
      )}
      <div className="mt-6">

<button

onClick={() => window.location="/dashboard"}

className="
w-full
py-3
rounded-xl
bg-sky-500
text-white
hover:bg-sky-600
transition
"

>

View Dashboard

</button>

</div>

    </div>

    {/* GitHub */}

    <div
      className="
        border
        rounded-2xl
        p-5
        hover:shadow-lg
        transition
      "
    >

      <h3 className="font-semibold text-lg">
        GitHub
      </h3>

      {profile.github_username ? (
        <>
          <p className="text-green-600 mt-2">
            ✓ Connected
          </p>

          <a
            href={`https://github.com/${profile.github_username}`}
            target="_blank"
            rel="noreferrer"
            className="
              text-sky-600
              mt-3
              inline-block
            "
          >
            View Profile →
          </a>
        </>
      ) : (
        <p className="text-red-500 mt-2">
          Not Connected
        </p>
      )}

    </div>

    {/* LinkedIn */}

    <div
      className="
        border
        rounded-2xl
        p-5
        hover:shadow-lg
        transition
      "
    >

      <h3 className="font-semibold text-lg">
        LinkedIn
      </h3>

      {profile.linkedin_url ? (
        <>
          <p className="text-green-600 mt-2">
            ✓ Connected
          </p>

          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="
              text-sky-600
              mt-3
              inline-block
            "
          >
            View Profile →
          </a>
        </>
      ) : (
        <p className="text-red-500 mt-2">
          Not Connected
        </p>
      )}

    </div>

  </div>

</div>

{/* Interests */}

<div className="mt-8 bg-white rounded-3xl shadow-md p-8">

  <h2 className="text-2xl font-bold mb-6">
    Interests
  </h2>

  <div className="flex flex-wrap gap-3">

    {profile.interests
      ?.split(",")
      .map((interest) => (

        <span
          key={interest}
          className="
            px-4
            py-2
            rounded-full
            bg-indigo-100
            text-indigo-700
          "
        >
          {interest.trim()}
        </span>

    ))}

  </div>

</div>


        {/* Skills */}

        <div
          className="
            mt-8
            bg-white
            rounded-3xl
            shadow-md
            p-8
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-6
            "
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">

          {profile.skills
            ?.split(",")
            .map((skill) => (

              <span
                key={skill}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-sky-100
                  text-sky-700
                "
              >
                {skill.trim()}
              </span>

          ))}

        </div>
        </div>

      </div>

      {/* Edit Modal */}

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              bg-black/50
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-4
            "
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="
                bg-white/95
                backdrop-blur-2xl
                w-full
                max-w-2xl
                max-h-[88vh]
                rounded-3xl
                p-6
                md:p-8
                shadow-2xl
                border
                border-sky-100
                flex
                flex-col
                overflow-hidden
                my-auto
                relative
                z-50
              "
            >

              {/* Fixed Header */}
              <div className="flex-shrink-0 flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <h2 className="text-2xl font-extrabold text-slate-800">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setEditing(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-xl cursor-pointer px-2"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Body Container */}
              <div className="flex-1 overflow-y-auto pr-3 space-y-6 my-2">

                {/* Profile Images Section */}
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Profile Images
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <p className="font-semibold text-xs text-slate-600 uppercase tracking-wider">
                        Profile Picture
                      </p>
                      <button
                        disabled={uploading}
                        onClick={() => document.getElementById("avatarUpload").click()}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer shadow-sm"
                      >
                        {uploading ? "Uploading..." : "Upload Avatar"}
                      </button>
                      <button
                        disabled={uploading}
                        onClick={deleteAvatar}
                        className="w-full border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer"
                      >
                        Delete Avatar
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      <p className="font-semibold text-xs text-slate-600 uppercase tracking-wider">
                        Cover Banner
                      </p>
                      <button
                        disabled={uploading}
                        onClick={() => document.getElementById("bannerUpload").click()}
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer shadow-sm"
                      >
                        {uploading ? "Uploading..." : "Upload Banner"}
                      </button>
                      <button
                        onClick={deleteBanner}
                        className="w-full border border-red-200 text-red-500 hover:bg-red-50 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer"
                      >
                        Delete Banner
                      </button>
                    </div>
                  </div>
                </div>

                {/* Profile Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Headline
                    </label>
                    <input
                      name="headline"
                      value={formData.headline}
                      onChange={handleChange}
                      placeholder="Professional Headline"
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      About / Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Location
                      </label>
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        University
                      </label>
                      <input
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        placeholder="University"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Degree
                      </label>
                      <input
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        placeholder="B.S. Computer Science"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Grad Year
                      </label>
                      <input
                        name="graduation_year"
                        value={formData.graduation_year}
                        onChange={handleChange}
                        placeholder="2025"
                        className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        LeetCode Username
                      </label>
                      <input
                        name="leetcode_username"
                        value={formData.leetcode_username}
                        onChange={handleChange}
                        placeholder="LeetCode Username"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        GitHub Username
                      </label>
                      <input
                        name="github_username"
                        value={formData.github_username}
                        onChange={handleChange}
                        placeholder="GitHub Username"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        LinkedIn URL
                      </label>
                      <input
                        name="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={handleChange}
                        placeholder="LinkedIn Profile URL"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Portfolio URL
                      </label>
                      <input
                        name="portfolio_url"
                        value={formData.portfolio_url}
                        onChange={handleChange}
                        placeholder="Portfolio Website URL"
                        className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Skills
                    </label>
                    <textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="Python, C++, Data Structures, Algorithms (Comma Separated)"
                      rows={2}
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Interests
                    </label>
                    <textarea
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Competitive Programming, Machine Learning, Web Development (Comma Separated)"
                      rows={2}
                      className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-400 outline-none text-sm font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Fixed Bottom Action Footer */}
              <div className="flex-shrink-0 pt-4 border-t border-slate-100 flex gap-4 mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveProfile}
                  className="
                    flex-1
                    py-3.5
                    liquid-button
                    text-white
                    font-bold
                    rounded-xl
                    shadow-lg
                    cursor-pointer
                  "
                >
                  Save Profile
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditing(false)}
                  className="
                    flex-1
                    py-3.5
                    border
                    border-slate-300
                    hover:bg-slate-50
                    text-slate-700
                    font-bold
                    rounded-xl
                    cursor-pointer
                  "
                >
                  Cancel
                </motion.button>
              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}