const { Octokit } = require('octokit');
  const { contetext } = require('@actions/github');
  async function closePullRequests() {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { data: pullRequests } = await octokit.pulls.list({
      owner: context.repo.owner,
      repo: context.repo.repo,
      state: 'open',
    });

    const currentDate = new Date();

    for (const pullRequest of pullRequests) {
      const createdAt = new Date(pullRequest.created_at);
      const timeDifference = currentDate - createdAt;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        await octokit.pulls.update({
          owner: context.repo.owner,
          repo: context.repo.repo,
          pull_number: pullRequest.number,
          state: 'closed',
        });
    }
  }

  closePullRequests().catch(console.error);
