import { useState } from "react";
import { supabase } from "./supabase/supabaseClient";

export default function LandscapeImage() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [lastImg, setLastImg] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(true);


  const generateAndUpload = async () => {
    const number = Number(count); 
    if (!number || number < 1 || number > 5) return; //test to see if number is correct

    const newUrls = [];

    for (let i = 0; i < number; i++) {
      try {
        const imageUrl = `https://picsum.photos/300/200?${Date.now()}-${Math.random()}`; //You can try in the url every img is different so we're soing x time the url and retrieving the img (math random is use because we don't want to have the same img)
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const filePath = `landscape_${Date.now()}_${Math.random()}.jpg`;

        const { error } = await supabase.storage
          .from("images")
          .upload(filePath, blob, {
            contentType: "image/jpeg",
          });

        if (error) {
          console.error("Supabase upload error:", error);
          continue;
        }

        const { data: publicData } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        newUrls.push(publicData.publicUrl);
      } catch (err) {
        console.error("Erreur :", err);
      }
    }

    setImgUrls(newUrls);
    setToggle(true); // default: show all
  };

  // We go to search Last image
  const showLastImg = async () => {
    setToggle(false);

    const { data: files, error } = await supabase.storage
      .from("images")
      .list("", { sortBy: { column: "created_at", order: "asc" } });

    if (error) {
      console.error("Erreur listage:", error);
      return;
    }

    if (!files || files.length === 0) return;

    const lastFile = files[files.length - 1]; // last uploaded img
    const fileName = lastFile.name;

    const { data: publicData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    setLastImg(publicData.publicUrl);
  };

  return (
    <div>
      <h2>Landscape API</h2>
      <p>https://picsum.photos/300/200</p>

      {!toggle && lastImg && ( //If toggle = false we only display lastImg 
        <img
          src={lastImg}
          alt="Last landscape"
          width={300}
          height={200}
          style={{
            borderRadius: "8px",
            marginBottom: "10px",
            display: "block",
          }}
        />
      )}

      {toggle &&
        imgUrls.map((url, index) => ( //If toggle = true we display all the newly generated img
          <img
            key={index}
            src={url}
            alt="Landscape"
            width={300}
            height={200}
            style={{
              borderRadius: "8px",
              marginBottom: "10px",
              display: "block",
            }}
          />
        ))}

      <br />

      Enter images count 
      <input // To choose the number of image we want to download 
        type="text"
        placeholder="1-5"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        style={{ width: "40px", textAlign: "center" }}
      />

      <br />    
      <button onClick={generateAndUpload}>Generate & Upload</button> {/*To generete x images and to store them in the DB*/}
      <button onClick={showLastImg}>showLastImg</button> {/* Fetch from DB last img */}
    </div>
  );
}
