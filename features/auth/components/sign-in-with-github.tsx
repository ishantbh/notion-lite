'use client'

import { toast } from 'sonner'

import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/assets/github-icon'

export function SignInWithGitHub() {
  async function signInWithGitHub() {
    await authClient.signIn.social(
      {
        provider: 'github',
        callbackURL: '/dashboard',
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <Button type='button' variant='outline' onClick={signInWithGitHub}>
      <GitHubIcon />
      <span>Sign in with GitHub</span>
    </Button>
  )
}
