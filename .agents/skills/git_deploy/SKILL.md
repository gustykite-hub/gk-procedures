---
name: Git Deployment Assistant
description: Triggers when the user requests to deploy, commit, or publish changes to test, staging, main, or production branches (e.g. /deploy to test, /commit to test, /deploy to main).
---

# Git Deployment Assistant Skill

This skill automates the Git workflow for checking out, committing, merging, and pushing changes to the `test` (staging) or `main` (production) branches.

## Instructions for the Agent

When the user triggers this skill (e.g., via `/deploy to test`, `/commit to test`, `/deploy to main`, or similar phrases):

1. **Identify the Target Branch:**
   - Determine if the user is targeting the `test` (staging) branch or the `main` (production) branch.
   - If the target is not clear, ask the user for clarification.

2. **Check Status and Stage Changes:**
   - Run `git status` to check for modified, new, or deleted files.
   - If there are no changes, inform the user that the repository is clean and no deploy is needed.
   - Stage all changes using:
     ```bash
     git add .
     ```

3. **Handle the Commit Message:**
   - If the user specified a message (e.g., `/deploy to test "fixed reception styles"`), extract and use that message.
   - If no message was provided, run a quick diff and auto-generate a concise Conventional Commit message (e.g., `feat: update reception protocols` or `fix: correct layout spacing`).

4. **Execution Flow:**
   * **For test/staging deployments:**
     1. Switch to the `test` branch:
        ```bash
        git checkout test
        ```
     2. Commit the staged changes:
        ```bash
        git commit -m "<commit_message>"
        ```
     3. Push to GitHub:
        ```bash
        git push origin test
        ```
   * **For main/production deployments:**
     1. Switch to the `main` branch:
        ```bash
        git checkout main
        ```
     2. Merge the `test` branch:
        ```bash
        git merge test
        ```
     3. Push to GitHub:
        ```bash
        git push origin main
        ```

5. **Completion Notification:**
   - Print a success message confirming the branch has been pushed.
   - Remind the user that Cloudflare Pages is automatically deploying the build and it will be live shortly.
