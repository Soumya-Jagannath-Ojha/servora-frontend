function PageTransition({ children }) {
  return (
    <div className="animate-page-enter min-h-[calc(100vh-12rem)]">
      {children}
    </div>
  )
}

export default PageTransition
