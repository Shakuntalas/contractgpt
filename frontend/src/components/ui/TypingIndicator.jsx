function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-2" aria-label="AI is typing">
      <div className="typing-dot" />
      <div className="typing-dot" />
      <div className="typing-dot" />
    </div>
  );
}

export default TypingIndicator;
