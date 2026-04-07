'use client'

import { NewsItem, deleteNews, toggleFeatured, reorderNews } from "@/actions/news"
import { useRef, useState } from "react"

export default function ReorderableNewsList({ initialNews }: { initialNews: NewsItem[] }) {
    const [news, setNews] = useState<NewsItem[]>(initialNews)

    type DragInfo = { draggedId: string; overId: string } | null
    const dragInfoRef = useRef<DragInfo>(null)
    const [dragState, setDragState] = useState<DragInfo>(null)

    const featured = news.filter(n => n.featured)
    const normal = news.filter(n => !n.featured)

    async function saveOrder(group: NewsItem[]) {
        const ids = group.map(n => n.id)
        await reorderNews(ids)
    }

    function handleDragStart(id: string) {
        dragInfoRef.current = { draggedId: id, overId: id }
        setDragState({ draggedId: id, overId: id })
    }

    function handleDragOver(e: React.DragEvent, overId: string) {
        e.preventDefault()
        if (!dragState || overId === dragState.draggedId) return

        const dragged = news.find(n => n.id === dragState.draggedId)!
        const target = news.find(n => n.id === overId)!
        if (dragged.featured !== target.featured) return

        dragInfoRef.current = { draggedId: dragState.draggedId, overId }
        setDragState(prev => prev ? { ...prev, overId } : null)
    }

    function handleDrop() {
        if (!dragInfoRef.current) return resetDrag()

        const { draggedId, overId } = dragInfoRef.current

        const dragged = news.find(n => n.id === draggedId)!
        const target = news.find(n => n.id === overId)!

        // Can only drop within same group
        if (dragged.featured !== target.featured) return resetDrag()

        const group = news.filter(n => n.featured === dragged.featured)
        const otherGroup = news.filter(n => n.featured !== dragged.featured)

        const fromIndex = group.findIndex(n => n.id === draggedId)
        const toIndex = group.findIndex(n => n.id === overId)

        const reordered = [...group]
        reordered.splice(fromIndex, 1)
        reordered.splice(toIndex, 0, group[fromIndex])

        const full = dragged.featured
            ? [...reordered, ...otherGroup]
            : [...otherGroup, ...reordered]

        setNews(full)
        saveOrder(reordered)

        resetDrag()
    }

    function resetDrag() {
        dragInfoRef.current = null
        setDragState(null)
    }

    async function handleToggle(id: string) {
        await toggleFeatured(id)
        const updated = news.map(n =>
            n.id === id ? { ...n, featured: !n.featured } : n
        )
        setNews(updated.sort((a, b) => Number(b.featured) - Number(a.featured)))
    }

    async function handleDelete(id: string) {
        await deleteNews(id)
        setNews(prev => prev.filter(n => n.id !== id))
    }

    function renderList(items: NewsItem[], label: string, labelColor: string) {
        if (items.length === 0) return null
        return (
            <div>
                <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 px-4 ${labelColor}`}>{label}</h3>
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#f0f4f8] text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider">
                                <tr>
                                    <th className="p-6 w-12"></th>
                                    <th className="p-6">Naslov</th>
                                    <th className="p-6">Datum</th>
                                    <th className="p-6">Slika</th>
                                    <th className="p-6 text-center">Izdvojeno</th>
                                    <th className="p-6 text-right">Akcije</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border)]">
                                {items.map((item) => {
                                    const isOver = dragState?.overId === item.id && dragState?.draggedId !== item.id
                                    const isDragging = dragState?.draggedId === item.id
                                    return (
                                        <tr
                                            key={item.id}
                                            draggable
                                            onDragStart={() => handleDragStart(item.id)}
                                            onDragOver={(e) => handleDragOver(e, item.id)}
                                            onDrop={handleDrop}
                                            onDragEnd={resetDrag}
                                            className={`transition-all ${
                                                isDragging ? 'opacity-30' : ''
                                            } ${isOver ? 'bg-blue-50 border-l-4 border-l-blue-400' : 'hover:bg-[var(--background-alt)]'}`}
                                        >
                                            <td className="p-6 cursor-grab select-none text-[var(--text-muted)] text-lg">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                    <circle cx="9" cy="6" r="1.5" />
                                                    <circle cx="15" cy="6" r="1.5" />
                                                    <circle cx="9" cy="12" r="1.5" />
                                                    <circle cx="15" cy="12" r="1.5" />
                                                    <circle cx="9" cy="18" r="1.5" />
                                                    <circle cx="15" cy="18" r="1.5" />
                                                </svg>
                                            </td>
                                            <td className="p-6 font-medium text-[var(--text-primary)]">{item.title}</td>
                                            <td className="p-6 text-[var(--text-secondary)]">{item.date}</td>
                                            <td className="p-6">
                                                <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded-lg" />
                                            </td>
                                            <td className="p-6 text-center">
                                                <button
                                                    onClick={() => handleToggle(item.id)}
                                                    className={`relative w-12 h-6 rounded-full transition-colors ${
                                                        item.featured ? 'bg-amber-400' : 'bg-gray-300'
                                                    }`}
                                                >
                                                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                                                        item.featured ? 'translate-x-6' : ''
                                                    }`} />
                                                </button>
                                            </td>
                                            <td className="p-6 text-right">
                                                <form action={handleDelete.bind(null, item.id)}>
                                                    <button className="text-red-500 hover:text-red-700 font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
                                                        Obriši
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    if (news.length === 0) return (
        <div className="p-12 text-center bg-[var(--surface)] rounded-xl text-[var(--text-secondary)]">
            Trenutno nema novosti.
        </div>
    )

    return (
        <div className="space-y-8" onDragOver={(e) => e.preventDefault()}>
            {renderList(featured, "Izdvojene novosti", "text-amber-500")}
            {renderList(normal, "Ostale novosti", "text-[var(--text-muted)]")}
        </div>
    )
}
