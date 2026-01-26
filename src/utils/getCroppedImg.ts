/**
 * Creates a cropped image from a source image and crop area
 * @param imageSrc - URL of the source image
 * @param pixelCrop - Crop area in pixels {x, y, width, height}
 * @returns Promise<Blob> - The cropped image as a Blob
 */
export default function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = imageSrc

        image.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Failed to get canvas context'))
                return
            }

            // Set canvas size to crop size
            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height

            // Draw the cropped image
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            )

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'))
                    return
                }
                resolve(blob)
            }, 'image/jpeg', 0.95)
        }

        image.onerror = () => {
            reject(new Error('Failed to load image'))
        }
    })
}
