import { useState } from "react";
import { supabase } from "./supabase/supabaseClient"; //Credentials for the cloud storage

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
        const imageUrl = `https://picsum.photos/300/200?-${Math.random()}`; //You can try in the url every img is different so we're doing x time the url and retrieving the img (math random is use because we don't want to have the same img)
        const response = await fetch(imageUrl);
        const blob = await response.blob(); //image is store as a blob storage

        const filePath = `landscape_${Math.random()}`; //Every img must have a different name to be uploaded in the blobl storage, the random function helps 
        
        const { error } = await supabase.storage // We upload the img in the DB
          .from("images")
          .upload(filePath, blob, {
            contentType: "image/jpeg", 
          });

        if (error) {
          console.error("Supabase upload error:", error);
          continue;
        }

        const { data: publicData } = supabase.storage // We retirebe the url like that we will be able to display it in the front end 
          .from("images")
          .getPublicUrl(filePath);

        newUrls.push(publicData.publicUrl);
      } catch (err) {
        console.error("Error :", err);
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
      .list("", { sortBy: { column: "created_at", order: "asc" } }); // We order them then we get the last one 

    if (error) {
      console.error("Error:", error);
      return;
    }

    if (!files || files.length === 0) return;

    const lastFile = files[files.length - 1]; // last uploaded img
    const fileName = lastFile.name;

    const { data: publicData } = supabase.storage //We retrieve the last img
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
