// app/PostHogPageView.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from "posthog-js/react";
import { useUser } from "@clerk/nextjs";

export default function PostHogPageView(): null {
  const posthog = usePostHog();

  const userInfo = useUser();
  useEffect(() => {
    if (userInfo.user?.id) {
      posthog.identify(userInfo.user.id, {
        email: userInfo.user.emailAddresses[0]?.emailAddress,
      });
    } else {
      posthog.reset();
    }
  }, [posthog, userInfo.user]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
