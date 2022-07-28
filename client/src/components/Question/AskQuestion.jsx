import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import '../../styles/Question/askQuestion.css';
import { RiCloseFill } from 'react-icons/ri';
import { useMutation } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";


const AskQuestion = () => {


    const user = useSelector((state) => state.userDetails.existingUser);
    // console.log(user._id);

    const [isMyInputFocused, setIsMyInputFocused] = useState(false);

    const [title, setTitle] = useState("");
    const [bodyContent, setBodyContent] = useState("");
    const [tagValue, setTagValue] = useState("");
    const [tags, setTags] = useState([]);

    const arr = ["Javascript", "C++", "Python", "Golang", "Java"];


    const handleTagClick = (newTag) => {
        if (tags.length < 4) {
            if (!tags.find(el => el === newTag)) {
                setTags(tags => [...tags, newTag]);
            }
        }
        setTagValue("");
    }

    const handleRemoveTag = (val) => {
        const index = tags.indexOf(val);
        if (index > -1) {
            setTags(tags.filter(item => item !== val));
        }
    }


    //asking the question
    const { mutate, isLoading } = useMutation(
        async data => {
            await axios({
                method: 'post',
                url: '/api/v1/question/ask',
                data
            })
        },
        {
            onSuccess: () => {
                alert('question posted successfully');
                setTitle("");
                setBodyContent("");
                setTags([]);
            }
        }
    )

    const handleSubmit = () => {
        mutate({
            title,
            body: bodyContent,
            tags,
            createdBy: user._id
        })
    }

    return (
        <>
            <div className="ask-parent">
                <div className="ask-heading">
                    Ask a public question
                </div>
                <div className='ask-wrapper'>
                    <div className="ask-left">

                        {/* Title  */}
                        <div className="ask-left-input-wrapper">
                            <label className="ask-left-input-head" htmlFor="title">
                                Title
                            </label>
                            <div className="ask-left-input-sub-head">
                                Be specific and imagine you’re asking a question to another person
                            </div>
                            <div className='ask-left-input'>
                                <input
                                    placeholder="eg. How to center a div ?"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="title" />
                            </div>
                        </div>

                        {/* Body  */}
                        <div className="ask-left-input-wrapper">
                            <label className="ask-left-input-head" htmlFor="body">
                                Body
                            </label>

                            <div className="ask-left-input-sub-head">
                                Include all the information someone would need to answer your question
                            </div>
                            <div className='ask-left-input-editor'>
                                <div>
                                    <MDEditor
                                        height={300}
                                        value={bodyContent}
                                        onChange={setBodyContent}
                                    />
                                </div>
                            </div>

                            {bodyContent.length ? (<div className="ask-input-body-previewer">
                                <MDEditor.Markdown source={bodyContent} />
                            </div>) : null}

                        </div>

                        {/* Tags  */}
                        <div className="ask-left-input-wrapper">
                            <label className="ask-left-input-head" htmlFor="tags">
                                Tags
                            </label>
                            <div className="ask-left-input-sub-head">
                                Add up to 5 tags to describe what your question is about
                            </div>
                            <div className={isMyInputFocused || tags.length ? 'ask-left-tag ask-tag-input-active' : 'ask-left-tag '}>
                                {
                                    tags.map(el => {
                                        return (
                                            <div className="tag-input-wrapper">
                                                <div className="tag-input-title">
                                                    {el}
                                                </div>
                                                <RiCloseFill
                                                    className="tag-input-cross"
                                                    fontSize={15}
                                                    onClick={() => { handleRemoveTag(el) }}
                                                />
                                            </div>
                                        )
                                    })
                                }

                                <input
                                    placeholder={!tags.length ? "eg. (javascript react android)" : ""}
                                    type="text"
                                    id="tags"
                                    value={tagValue}
                                    onChange={(e) => setTagValue(e.target.value)}
                                    onBlur={() => setIsMyInputFocused(false)}
                                    onFocus={() => setIsMyInputFocused(true)}
                                />
                            </div>
                            {
                                tagValue.length ?
                                    (<div className="ask-input-tag-list-wrapper">
                                        {
                                            arr.map((e) => {
                                                return (
                                                    <div className="tag-input-list-item"
                                                        key={e}
                                                        onClick={() => { handleTagClick(e) }}>
                                                        {e}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>)
                                    : null
                            }
                        </div>

                    </div>
                    <div className="ask-right">
                        How to ask ?
                        Best Asking stretegy
                    </div>
                </div>
                <div className="ask-submit-button btn"
                    onClick={handleSubmit}>
                    Ask my question
                </div>
            </div>
        </>
    )
}

export default AskQuestion
