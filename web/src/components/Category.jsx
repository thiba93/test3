/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"

const Category = () => {
  const [categories, setCategories] = useState([])


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("api/categories")

        if (!response.ok) {
          throw new Error("Network response was not ok.")
        }

        const contentType = response.headers.get("content-type")

        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!")
        }

        const data = await response.json()
        const sortedCategories = data.sort((a, b) => a.displayRank - b.displayRank).slice(0, 3)
        setCategories(sortedCategories)
      } catch (error) {
        toast("Error fetching categories:", error)
      }
    }
    

    fetchCategories()
  }, [])

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
    {categories.map((category, index) => (
      <div key={index} style={{ width: "calc(33.333% - 1rem)", position: "relative", marginBottom: "20px" }}>
      <Image 
            src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRifpBsS3fGJgO70OE7vGwLDt7IIKF02wVju8PwaNJXyxoadWRS4rDhgqvEVXBkj-IkllRN6RDByQp49zM"
            alt={category.displayName}
            width="300"
            height="400"
            objectFit="cover"
          />
        <p style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          fontSize: "20px",
          fontWeight: "bold",
          textAlign: "center",
          width: "100%"
        }}>
          {category.displayName}
        </p>
      </div>
    ))}
  </div>
)
}



export default Category