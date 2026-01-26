'use client'

import { updateTrainer } from "@/actions/trainers";
import Link from "next/link";
import { useState } from "react";
import ImageCropper from "@/components/ImageCropper";

interface EditTrainerFormProps {
    trainer: {
        id: string;
        name: string;
        role: string;
        rank: string;
        image: string;
        phone: string;
    };
    trainerId: string;
}

export default function EditTrainerForm({ trainer, trainerId }: EditTrainerFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(trainer.image || null);
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [showCropper, setShowCropper] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedBlob: Blob) => {
        const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
        setCroppedFile(file);

        const previewUrl = URL.createObjectURL(croppedBlob);
        setImagePreview(previewUrl);

        setShowCropper(false);
    };

    const updateWithId = updateTrainer.bind(null, trainerId);

    const handleSubmit = async (formData: FormData) => {
        if (croppedFile) {
            formData.set('file', croppedFile);
        }
        await updateWithId(formData);
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            {showCropper && selectedImage && (
                <ImageCropper
                    imageSrc={selectedImage}
                    aspect={3 / 4}
                    onCropComplete={handleCropComplete}
                    onCancel={() => {
                        setShowCropper(false);
                        setSelectedImage(null);
                    }}
                />
            )}

            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/trainers" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Uredi Trenera</h1>
                    <p className="text-[var(--text-secondary)]">Izmjena podataka za: {trainer.name}</p>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="card p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Ime i Prezime
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={trainer.name}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Uloga
                            </label>
                            <input
                                name="role"
                                type="text"
                                required
                                defaultValue={trainer.role}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Rank
                            </label>
                            <input
                                name="rank"
                                type="text"
                                required
                                defaultValue={trainer.rank}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Telefon
                        </label>
                        <input
                            name="phone"
                            type="text"
                            defaultValue={trainer.phone}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Nova Fotografija (opcionalno)
                        </label>
                        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors bg-[var(--background-alt)]">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                className="hidden"
                                id="trainer-image-input"
                                onChange={handleImageSelect}
                            />
                            <label htmlFor="trainer-image-input" className="cursor-pointer">
                                {imagePreview ? (
                                    <div className="space-y-4">
                                        <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                                        <p className="text-sm text-[var(--primary)] font-medium">Click to change image</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <svg className="w-12 h-12 mx-auto text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <p className="text-[var(--text-secondary)]">Click to upload new image</p>
                                        <p className="text-xs text-[var(--text-muted)]">You'll be able to crop the image before uploading</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/trainers" className="px-6 py-2 text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg transition-colors font-medium">Odustani</Link>
                    <button type="submit" className="btn-primary">Sačuvaj Izmjene</button>
                </div>
            </form>
        </div>
    );
}
