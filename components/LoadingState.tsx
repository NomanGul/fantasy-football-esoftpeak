interface LoadingStateProps {
  loading: boolean;
}

export default function LoadingState({ loading }: LoadingStateProps) {
  if (loading) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-xl">Loading Fantasy Football data...</div>
      </div>
    );
  }

  return null;
}
