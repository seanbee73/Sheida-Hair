import React, { useState } from 'react';
import { REAL_REVIEWS, SALON_INFO } from '../data/salonData';
import { ChevronDown, ChevronUp, Sparkles, Star, MessageSquareQuote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [showAllReviews, setShowAllReviews] = useState<boolean>(false);
  const [filterTag, setFilterTag] = useState<string>('All');

  const reviewKeywords = [
    'All',
    'bleach test',
    'zero damage',
    'Haik',
    'Sheida',
    'Niloufar',
    'Hannah',
    'coffee',
  ];

  // 3 curated flagship reviews for default preview
  const featuredReviewIds = ['rev_sheida_1', 'rev_sheida_2', 'rev_sheida_6'];
  const featuredReviews = REAL_REVIEWS.filter((r) => featuredReviewIds.includes(r.id));

  const allFilteredReviews =
    filterTag === 'All'
      ? REAL_REVIEWS
      : REAL_REVIEWS.filter(
          (r) =>
            r.content.toLowerCase().includes(filterTag.toLowerCase()) ||
            r.positivePoints?.some((p) => p.toLowerCase().includes(filterTag.toLowerCase())) ||
            r.serviceMentioned?.toLowerCase().includes(filterTag.toLowerCase()) ||
            r.stylistMentioned?.toLowerCase().includes(filterTag.toLowerCase())
        );

  const displayedReviews = showAllReviews
    ? allFilteredReviews
    : featuredReviews.length > 0
    ? featuredReviews
    : REAL_REVIEWS.slice(0, 3);

  const handleTopicClick = (tag: string) => {
    setFilterTag(tag);
    if (!showAllReviews) {
      setShowAllReviews(true);
    }
  };

  const toggleAllReviews = () => {
    const nextState = !showAllReviews;
    setShowAllReviews(nextState);
    if (!nextState) {
      setFilterTag('All');
      const el = document.getElementById('reviews');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="reviews"
      className="max-w-[1400px] mx-auto w-full border-b border-white/5 py-20 px-6 relative scroll-mt-24 aura-reveal text-left"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-[#d8b485]"></div>
            <p className="text-[#d8b485] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#d8b485]" />
              {showAllReviews ? 'All Verified Client Experiences' : 'Featured Client Experiences'}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-2xl">
            Trusted by 500+ clients across Toronto.
          </h2>
          <p className="text-xs text-zinc-400 font-light mt-2 max-w-xl">
            Real stories from clients who experienced personalized consultations, zero-damage blonding, and precision cuts.
          </p>
        </div>

        {/* Rating Summary Badge */}
        <div className="flex items-center gap-4 bg-[#0c0c0e] border border-white/10 p-4 shrink-0">
          <div className="text-3xl font-bold text-[#d8b485] font-mono leading-none">
            {SALON_INFO.rating}
          </div>
          <div>
            <div className="flex text-[#d8b485] gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#d8b485] text-[#d8b485]" />
              ))}
            </div>
            <p className="text-[10px] text-zinc-400 font-mono">
              Based on {SALON_INFO.reviewCount}
            </p>
          </div>
        </div>
      </div>

      {/* Popular Sentiment Topics / Filter Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-zinc-500 mr-1">
            Filter by topic:
          </span>
          {reviewKeywords.map((tag) => {
            const isSelected = filterTag === tag && showAllReviews;
            return (
              <button
                key={tag}
                onClick={() => handleTopicClick(tag)}
                className={`px-3 py-1.5 text-[9px] font-bold tracking-wider uppercase transition-all border ${
                  isSelected
                    ? 'bg-[#d8b485] text-zinc-950 border-[#d8b485]'
                    : 'bg-[#0c0c0e] text-zinc-400 border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] text-zinc-500 font-mono">
          {showAllReviews
            ? `Showing ${displayedReviews.length} of ${REAL_REVIEWS.length} verified reviews`
            : `Showing 3 featured client stories`}
        </span>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 md:p-8 bg-[#0c0c0e] border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all group"
          >
            <div>
              {/* Header: Author & Source */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#d8b485] border border-white/10">
                    {review.author[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-[#d8b485] transition-colors">
                      {review.author}
                    </h4>
                    <p className="text-[9px] text-zinc-500 font-mono">{review.date}</p>
                  </div>
                </div>

                <div className="flex text-[#d8b485] gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#d8b485] text-[#d8b485]" />
                  ))}
                </div>
              </div>

              {/* Service & Stylist Tags */}
              {(review.stylistMentioned || review.serviceMentioned) && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {review.stylistMentioned && (
                    <span className="review-meta-tag-stylist text-[9px] px-2 py-0.5 bg-[#d8b485]/10 text-[#d8b485] border border-[#d8b485]/20 font-mono font-medium">
                      Stylist: {review.stylistMentioned}
                    </span>
                  )}
                  {review.serviceMentioned && (
                    <span className="review-meta-tag-service text-[9px] px-2 py-0.5 bg-white/5 text-zinc-300 border border-white/10 font-mono">
                      {review.serviceMentioned}
                    </span>
                  )}
                </div>
              )}

              {/* Review Body */}
              <p className="text-xs text-zinc-300 font-light leading-relaxed mb-6 italic">
                "{review.content}"
              </p>
            </div>

            {/* Positive Highlight Chips */}
            {review.positivePoints && (
              <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                {review.positivePoints.map((point, idx) => (
                  <span
                    key={idx}
                    className="review-highlight-tag text-[9px] uppercase tracking-wider font-semibold text-zinc-200 bg-white/5 border border-white/10 px-2.5 py-1 inline-flex items-center gap-1.5 rounded-xs"
                  >
                    <span className="text-[#d8b485] font-bold text-[10px]">✓</span> {point}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expand / Collapse Action Banner */}
      <div className="mt-10 flex flex-col items-center">
        <button
          onClick={toggleAllReviews}
          className={`w-full sm:w-auto min-w-[340px] px-8 py-4 border text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
            showAllReviews
              ? 'bg-[#141418] text-white border-white/20 hover:border-[#d8b485] hover:text-[#d8b485]'
              : 'bg-[#d8b485] text-zinc-950 border-[#d8b485] hover:bg-[#c2a277]'
          }`}
        >
          {showAllReviews ? (
            <>
              <span>Collapse to Featured Stories Only</span>
              <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>View All Verified Client Reviews ({REAL_REVIEWS.length} Reviews)</span>
              <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        {!showAllReviews && (
          <p className="text-[11px] text-zinc-500 font-light mt-3 tracking-wide text-center">
            Featuring 5-star experiences across haircuts with Haik, bleach transformations with Sheida, and Japanese Milbon treatments.
          </p>
        )}
      </div>
    </section>
  );
};

