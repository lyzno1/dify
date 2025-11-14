import type { Meta, StoryObj } from '@storybook/nextjs'
import React from 'react'

declare const require: any

type IconComponent = React.ComponentType<Record<string, unknown>>

type IconEntry = {
  name: string
  category: string
  path: string
  Component: IconComponent
}

const iconContext = require.context('./src', true, /\.tsx$/)

const iconEntries: IconEntry[] = iconContext
  .keys()
  .filter((key: string) => !key.endsWith('.stories.tsx') && !key.endsWith('.spec.tsx'))
  .map((key: string) => {
    const mod = iconContext(key)
    const Component = mod.default as IconComponent | undefined
    if (!Component)
      return null

    const relativePath = key.replace(/^\.\//, '')
    const path = `app/components/base/icons/src/${relativePath}`
    const parts = relativePath.split('/')
    const fileName = parts.pop() || ''
    const category = parts.length ? parts.join('/') : '(root)'
    const name = Component.displayName || fileName.replace(/\.tsx$/, '')

    return {
      name,
      category,
      path,
      Component,
    }
  })
  .filter(Boolean) as IconEntry[]

const sortedEntries = [...iconEntries].sort((a, b) => {
  if (a.category === b.category)
    return a.name.localeCompare(b.name)
  return a.category.localeCompare(b.category)
})

const filterEntries = (entries: IconEntry[], query: string) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized)
    return entries

  return entries.filter(entry =>
    entry.name.toLowerCase().includes(normalized)
    || entry.path.toLowerCase().includes(normalized)
    || entry.category.toLowerCase().includes(normalized),
  )
}

const groupByCategory = (entries: IconEntry[]) => entries.reduce((acc, entry) => {
  if (!acc[entry.category])
    acc[entry.category] = []

  acc[entry.category].push(entry)
  return acc
}, {} as Record<string, IconEntry[]>)

const containerStyle: React.CSSProperties = {
  padding: '32px clamp(16px, 4vw, 56px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  minHeight: '100vh',
  background: '#f6f7fb',
  boxSizing: 'border-box',
}

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '32px clamp(24px, 4vw, 40px)',
  borderRadius: 28,
  background: '#fff',
  boxShadow: '0 24px 60px rgba(15, 19, 36, 0.08)',
}

const headerEyebrowStyle: React.CSSProperties = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 1,
  color: '#8b8d98',
  fontWeight: 600,
}

const headerTitleRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 12,
}

const headerTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 34,
  lineHeight: 1.2,
}

const headerBadgeStyle: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  background: '#eef2ff',
  color: '#2d3ec7',
  fontWeight: 600,
  fontSize: 14,
}

const headerDescriptionStyle: React.CSSProperties = {
  margin: 0,
  color: '#5f5f66',
  lineHeight: 1.5,
}

const controlsStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: 16,
  flexWrap: 'wrap',
}

const searchFieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  flex: '1 1 320px',
  minWidth: 260,
}

const searchLabelStyle: React.CSSProperties = {
  fontSize: 12,
  color: '#6f7080',
  fontWeight: 600,
  letterSpacing: 0.4,
  textTransform: 'uppercase',
}

const searchInputStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 10,
  border: '1px solid #cfd2dc',
  background: '#fff',
  boxShadow: '0 2px 6px rgba(15, 19, 36, 0.05)',
}

const toggleButtonStyle: React.CSSProperties = {
  padding: '12px 20px',
  borderRadius: 999,
  border: 'none',
  background: '#111322',
  color: '#fff',
  cursor: 'pointer',
  fontWeight: 600,
  letterSpacing: 0.2,
}

const emptyTextStyle: React.CSSProperties = { color: '#5f5f66' }

const sectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
}

const sectionHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '8px 4px',
  borderBottom: '1px solid #e4e5ec',
  flexWrap: 'wrap',
}

const categoryTitleGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}

const categoryEyebrowStyle: React.CSSProperties = {
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: 0.6,
  color: '#a0a2b2',
  margin: 0,
}

const categoryTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 600,
  color: '#161823',
  letterSpacing: -0.2,
}

const categoryBadgeStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: 999,
  background: '#f4f5fb',
  color: '#4a4c63',
  fontWeight: 600,
  fontSize: 12,
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #e1e1e8',
  borderRadius: 8,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  minHeight: 140,
}

const previewBaseStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 48,
  borderRadius: 6,
}

const nameButtonBaseStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: 0,
  border: 'none',
  background: 'transparent',
  font: 'inherit',
  cursor: 'pointer',
  textAlign: 'left',
  fontWeight: 600,
}

const PREVIEW_SIZE = 40

const formatIconCount = (count: number): string => `${count} ${count === 1 ? 'icon' : 'icons'}`

const IconGalleryStory = () => {
  const [query, setQuery] = React.useState('')
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null)
  const [previewTheme, setPreviewTheme] = React.useState<'light' | 'dark'>('light')

  const filtered = React.useMemo(() => filterEntries(sortedEntries, query), [query])

  const grouped = React.useMemo(() => groupByCategory(filtered), [filtered])

  const categoryOrder = React.useMemo(
    () => Object.keys(grouped).sort((a, b) => a.localeCompare(b)),
    [grouped],
  )

  React.useEffect(() => {
    if (!copiedPath)
      return undefined

    const timerId = window.setTimeout(() => {
      setCopiedPath(null)
    }, 1200)

    return () => window.clearTimeout(timerId)
  }, [copiedPath])

  const handleCopy = React.useCallback((text: string) => {
    navigator.clipboard?.writeText(text)
      .then(() => {
        setCopiedPath(text)
      })
      .catch((err) => {
        console.error('Failed to copy icon path:', err)
      })
  }, [])

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <span style={headerEyebrowStyle}>Collections</span>
        <div style={headerTitleRowStyle}>
          <h1 style={headerTitleStyle}>Icon Gallery</h1>
          <span style={headerBadgeStyle}>{formatIconCount(filtered.length)}</span>
        </div>
        <p style={headerDescriptionStyle}>
          Browse all icon components sourced from <code>app/components/base/icons/src</code>. Use the search bar
          to filter by name or path.
        </p>
        <div style={controlsStyle}>
          <div style={searchFieldStyle}>
            <span style={searchLabelStyle}>Search library</span>
            <input
              style={searchInputStyle}
              placeholder="Search icons by name or file path"
              value={query}
              onChange={event => setQuery(event.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setPreviewTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
            style={toggleButtonStyle}
          >
            Toggle {previewTheme === 'light' ? 'dark' : 'light'} preview
          </button>
        </div>
      </header>
      {categoryOrder.length === 0 && (
        <p style={emptyTextStyle}>No icons match the current filter.</p>
      )}
      {categoryOrder.map((category) => {
        const categoryEntries = grouped[category]
        return (
          <section key={category} style={sectionStyle}>
            <div style={sectionHeaderStyle}>
              <div style={categoryTitleGroupStyle}>
                <span style={categoryEyebrowStyle}>Directory</span>
                <h2 style={categoryTitleStyle}>{category}</h2>
              </div>
              <span style={categoryBadgeStyle}>{formatIconCount(categoryEntries.length)}</span>
            </div>
            <div style={gridStyle}>
              {categoryEntries.map(entry => (
                <div key={entry.path} style={cardStyle}>
                  <div
                    style={{
                      ...previewBaseStyle,
                      background: previewTheme === 'dark' ? '#1f2024' : '#fff',
                    }}
                  >
                    <entry.Component style={{ width: PREVIEW_SIZE, height: PREVIEW_SIZE }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(entry.path)}
                    style={{
                      ...nameButtonBaseStyle,
                      color: copiedPath === entry.path ? '#00754a' : '#24262c',
                    }}
                  >
                    {copiedPath === entry.path ? 'Copied!' : entry.name}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

const meta: Meta<typeof IconGalleryStory> = {
  title: 'Base/Icons/Icon Gallery',
  component: IconGalleryStory,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof IconGalleryStory>

export const All: Story = {
  render: () => <IconGalleryStory />,
}
