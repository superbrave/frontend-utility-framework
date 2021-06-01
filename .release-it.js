module.exports = {
    git: {
        requireCleanWorkingDir: false,
        commitMessage: 'release: ${version}',
        requireBranch: "master",
        requireUpstream: false
    },
    github: {
        release: true,
    },
    plugins: {
        '@release-it/conventional-changelog': {
            infile: 'CHANGELOG.md',
            preset: {
                name: 'conventionalcommits',
                types: [
                    {
                        type: 'feature',
                        section: 'Features'
                    },
                    {
                        type: 'fix',
                        section: 'Bugfixes'
                    }
                ]
            }
        }
    }
};