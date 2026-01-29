"use client";

import React, { useState } from "react";
import { X, Bold, Italic, Link2, Image, Video, List, Code, Undo2, Calendar, Quote, Upload, Trash2 } from "lucide-react";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [activeTab, setActiveTab] = useState("text");
    const [community, setCommunity] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const textareaRef = React.useRef(null);
    const fileInputRef = React.useRef(null);

    if (!isOpen) return null;

    const insertMarkdown = (before, after = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = body.substring(start, end);
        const newText = body.substring(0, start) + before + selectedText + after + body.substring(end);
        setBody(newText);

        setTimeout(() => {
            textarea.selectionStart = start + before.length;
            textarea.selectionEnd = start + before.length + selectedText.length;
            textarea.focus();
        }, 0);
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files || []);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedFiles(prev => [...prev, {
                    name: file.name,
                    type: file.type,
                    size: (file.size / 1024).toFixed(2),
                    data: event.target.result
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index) => {
        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handlePost = async () => {
        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }
        const newPost = {
            _id: Date.now().toString(),
            content: title,
            body: body,
            image: uploadedFiles[0]?.data || null,
            user: {
                name: "You",
                username: "user",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            },
            createdAt: new Date().toISOString(),
            sparks: 0,
            dims: 0,
            thoughts: 0
        };
        if (onPostCreated) {
            onPostCreated(newPost);
        }
        setTitle("");
        setBody("");
        setUploadedFiles([]);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
            <div className="ultra-glass rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20">
                {/* Header */}
                <div className="sticky top-0 bg-black/60 backdrop-blur-sm border-b border-white/10 p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">Create post</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">Drafts</span>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* Community Selector */}
                    <select
                        value={community}
                        onChange={(e) => setCommunity(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 rounded-full text-white font-medium hover:bg-white/20 transition-colors appearance-none cursor-pointer border border-white/20"
                    >
                        <option value="">Select a community</option>
                        <option value="general">General</option>
                        <option value="tech">Technology</option>
                        <option value="design">Design</option>
                        <option value="business">Business</option>
                    </select>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b border-white/20">
                        {["text", "images & video", "link", "poll"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 font-medium transition-colors capitalize ${
                                    activeTab === tab
                                        ? "text-cyan-400 border-b-2 border-cyan-400"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Title Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Title*"
                            value={title}
                            onChange={(e) => setTitle(e.target.value.slice(0, 300))}
                            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400"
                        />
                        <div className="text-right text-sm text-gray-400 mt-2">{title.length}/300</div>
                    </div>

                    {/* Tags */}
                    <button className="px-4 py-2 bg-white/10 text-gray-300 rounded-lg hover:bg-white/20 transition-colors font-medium border border-white/20">
                        Add tags
                    </button>

                    {/* Body Text */}
                    <div>
                        <div className="flex gap-2 mb-3 p-3 bg-white/5 rounded-lg border border-white/10 flex-wrap items-center">
                            <button
                                onClick={() => insertMarkdown("**", "**")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Bold"
                            >
                                <Bold size={18} />
                            </button>
                            <button
                                onClick={() => insertMarkdown("*", "*")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Italic"
                            >
                                <Italic size={18} />
                            </button>
                            <button
                                onClick={() => insertMarkdown("~~", "~~")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Strikethrough"
                            >
                                <span className="line-through">S</span>
                            </button>
                            <button
                                onClick={() => insertMarkdown("# ")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Heading"
                            >
                                <span className="font-bold">H</span>
                            </button>
                            <div className="w-px h-6 bg-white/20"></div>
                            <button
                                onClick={() => insertMarkdown("[", "](url)")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Link"
                            >
                                <Link2 size={18} />
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Upload Image"
                            >
                                <Image size={18} />
                            </button>
                            <button
                                onClick={() => insertMarkdown("[video](", ")")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Video"
                            >
                                <Video size={18} />
                            </button>
                            <div className="w-px h-6 bg-white/20"></div>
                            <button
                                onClick={() => insertMarkdown("- ")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="List"
                            >
                                <List size={18} />
                            </button>
                            <button
                                onClick={() => insertMarkdown("> ")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Quote"
                            >
                                <Quote size={18} />
                            </button>
                            <button
                                onClick={() => insertMarkdown("```\n", "\n```")}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                title="Code Block"
                            >
                                <Code size={18} />
                            </button>
                            <div className="w-px h-6 bg-white/20"></div>
                            <button
                                onClick={() => setBody(body.slice(0, -1))}
                                className="p-2 hover:bg-white/10 rounded text-sm font-medium text-gray-300 hover:text-white transition-colors ml-auto"
                                title="Undo"
                            >
                                <Undo2 size={18} />
                            </button>
                        </div>

                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        <textarea
                            ref={textareaRef}
                            placeholder="Body text (optional)"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full p-4 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white placeholder-gray-400 min-h-[250px] resize-none"
                        />
                    </div>

                    {/* Uploaded Files Preview */}
                    {uploadedFiles.length > 0 && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-white">Uploaded Files ({uploadedFiles.length})</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {uploadedFiles.map((file, idx) => (
                                    <div key={idx} className="relative group">
                                        {file.type.startsWith("image/") ? (
                                            <img src={file.data} alt={file.name} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                        ) : (
                                            <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                                <div className="text-center">
                                                    <Upload size={24} className="text-gray-400 mx-auto mb-1" />
                                                    <p className="text-xs text-gray-600 truncate px-2">{file.name}</p>
                                                    <p className="text-xs text-gray-500">{file.size} KB</p>
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => removeFile(idx)}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-white/20">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-white/10 text-gray-300 rounded-full font-medium hover:bg-white/20 transition-colors border border-white/20"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={handlePost}
                            className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-purple-400 text-white rounded-full font-medium hover:shadow-lg transition-all"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
