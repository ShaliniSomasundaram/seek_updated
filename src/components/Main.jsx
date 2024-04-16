
import React, { useState, useEffect } from 'react';
import Style from "../style/main.module.css";
import Family from "../assets/fam_logo.png";
import Plus from "../assets/plus.png";
import Upld from "../assets/upload-icon.png";
import Upimg from "../assets/cloud-upload-icon.png";
import axios from "axios";

function Main() {
    const [image, setImage] = useState(null);
    const [familyMembers, setFamilyMembers] = useState([{ name: "", relation: "", age: ""}]);
    const [retreive,setRetreive] = useState(false)
    const [newData, setNewData] = useState(null); 


    const handleChange = (index, key, value) => {
        const updatedFamilyMembers = [...familyMembers];
        updatedFamilyMembers[index][key] = value;
        setFamilyMembers(updatedFamilyMembers);
    };

    const addFamilyMember = () => {
        if (familyMembers.length < 4){
            setFamilyMembers([...familyMembers, { name: "", relation: "RELATIONSHIP", age: ""}]);
        }
    };


    const submit = () => {
        axios.post("http://localhost:3000/data", { mem: familyMembers, fil: image })
            .then(response => {
                const lastPostedId = response.data.id; 
                console.log(lastPostedId);
                axios.get(`http://localhost:3000/data/${lastPostedId}`)
                .then(response => {
                    const newData = response.data; 
                    setNewData(newData);
                    setRetreive(true)
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
    };
    

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    return (
        <div id={Style.container1}>
            <section>
                <img src={Family} alt="Fam-logo" />
                <article>
                    <div id={Style.heading}>Anu</div>
                    <div id={Style.heading2}>Add a Family Member</div>

                    {retreive ? (
                        newData && (
                            <div key={newData.id} id={Style.newcont1}>
                                {newData.mem.map((member, index) => (
                                    <div key={index}>
                                        <input type="text" value={member.name} className={Style.newinp1} disabled/>
                                        <select value={member.relation} id={Style.newinp} disabled>
                                            <option value="RELATIONSHIP">RELATIONSHIP</option>
                                            <option value="Father">Father</option>
                                            <option value="Mother">Mother</option>
                                            <option value="Brother">Brother</option>
                                            <option value="Sister">Sister</option>
                                        </select>
                                        <input type="number" value={member.age} className={Style.newinp1} disabled/>
                                    </div>
                                ))}
                            </div>
                        )
                    ) : (
                        familyMembers.map((member, index) => (
                            <div key={index} id={Style.details}>
                                <input type="text" className={Style.inp1} placeholder="NAME" value={member.name} onChange={(e) => handleChange(index, 'name', e.target.value)}/>
                                <select id={Style.inp} value={member.relation} onChange={(e) => handleChange(index, 'relation', e.target.value)}>
                                    <option value="RELATIONSHIP">RELATIONSHIP</option>
                                    <option value="Father">Father</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Brother">Brother</option>
                                    <option value="Sister">Sister</option>
                                </select>
                                <input type="number" className={Style.inp1} placeholder="AGE" value={member.age} onChange={(e) => handleChange(index, 'age', e.target.value)}/>
                            </div>
                        ))
                    )}

                    <div id={Style.addon} onClick={addFamilyMember}>
                        <img src={Plus} alt="plus-symbol" />
                        <section>Add more</section>
                    </div>

                    <input type="file" id="uploadInput" style={{ display: 'none' }} accept="image/*" onChange={handleImageChange}/>
                    <a id={Style.famPhoto} href="#" onClick={() => document.getElementById('uploadInput').click()}>
                        <img src={Upld} alt="upload-img" />
                        <section>Upload a Family Photo</section>
                    </a>

                    {retreive ? (
                        <div id={Style.preview}>
                            <img src={newData.fil} alt="" />
                        </div>
                    ) : (
                        <div id={Style.preview}>
                            <img src={Upimg} alt="" />
                        </div>
                    )}

                    <button onClick={submit}>SUBMIT</button>
                </article>
            </section>
        </div>
    );
}

export default Main;