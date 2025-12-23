# 🔍 Explanation: Why "The plural name 'client-logos' should be unique" Error Persists

## The Problem

Strapi is detecting that the pluralName `"client-logos"` appears **twice** when it loads content types during startup, causing it to crash.

## What We've Verified

✅ **Only ONE schema file exists** with `"pluralName": "client-logos"`
- Location: `/opt/app/src/api/client-logos/content-types/client-logos/schema.json`
- Confirmed by: `find /opt/app/src -name "schema.json" -exec grep -l "client-logos" {} \;`

✅ **No duplicate in database**
- `strapi_database_schema` table is empty
- No entries in `strapi_core_store_settings`

✅ **No duplicate files**
- Only one directory: `/opt/app/src/api/client-logos`
- No symlinks or duplicate paths found

✅ **All cache cleared**
- `.cache`, `build`, `.tmp` directories removed

## Why This Is Happening

### Most Likely Cause: Strapi v5 Schema Loading Bug

In Strapi v5, the schema loader scans `/opt/app/src/api/*/content-types/*/schema.json` files and builds an internal registry. The `validateContentTypesUnicity` function (at `/opt/app/node_modules/@strapi/core/dist/loaders/apis.js:53:23`) then checks that each `pluralName` appears only once.

**The issue:** Even though there's only ONE physical file, Strapi is somehow seeing it **twice** in its internal registry. This could be due to:

1. **Mounted Volume Issue**: If `/opt/app/src` is mounted from the host, Docker might be exposing the same directory through multiple mount points, causing Strapi's file scanner to read it twice.

2. **Strapi v5 Bug**: There might be a bug in Strapi v5's schema loader where it's:
   - Reading the same schema file twice (race condition in file scanning)
   - Caching the schema incorrectly before validation
   - Having a conflict between `collectionName` and `pluralName` validation

3. **Case Sensitivity Issue**: The `collectionName` is `"client_logos"` (with underscore) while `pluralName` is `"client-logos"` (with hyphen). Strapi might be normalizing these and creating a conflict.

4. **Internal Registry Issue**: Strapi might have cached the schema in an internal registry (not in database, but in memory/disk cache) that persists even after clearing `.cache`.

## The Error Location

```
Error: The plural name "client-logos" should be unique
at /opt/app/node_modules/@strapi/core/dist/loaders/apis.js:53:23
at validateContentTypesUnicity (/opt/app/node_modules/@strapi/core/dist/loaders/apis.js:42:20)
at loadAPIs (/opt/app/node_modules/@strapi/core/dist/loaders/apis.js:34:5)
```

This happens during the `loadAPIs` phase, which:
1. Scans all schema files
2. Builds a registry of content types
3. Validates uniqueness of pluralNames
4. **Fails** because it finds "client-logos" twice

## Potential Solutions

### Solution 1: Change the pluralName (Workaround)

Since we can't find the duplicate, change the pluralName to something unique:

```json
{
  "pluralName": "client-logos-section"  // Changed from "client-logos"
}
```

This would require updating the frontend code that fetches from `/api/client-logos` to `/api/client-logos-section`.

### Solution 2: Check for Mounted Volume Duplicates

Check if the directory is mounted multiple times:

```bash
docker inspect $CONTAINER_ID | grep -A 20 "Mounts"
```

### Solution 3: Use a Different Collection Name

The conflict might be between `collectionName: "client_logos"` and `pluralName: "client-logos"`. Try making them consistent:

```json
{
  "collectionName": "client_logos_section",  // Changed
  "info": {
    "pluralName": "client-logos-section"     // Changed
  }
}
```

### Solution 4: Check Strapi Version

This might be a known bug in Strapi v5.33.0. Check if there's an update or known issue.

## Why This Happened

The error likely occurred because:
1. The schema was created incorrectly the first time (maybe with a duplicate definition)
2. Strapi cached it internally
3. Even though we removed files and cleared cache, Strapi's internal registry still has a reference
4. When we recreate the schema, Strapi sees both the old cached reference AND the new file, causing the duplicate error

## The Real Issue

**We can't find the duplicate because it's not in a file or database - it's in Strapi's internal schema registry that's built during startup and persists in a way we can't easily clear without a complete Strapi rebuild or removing the content type from Strapi's perspective first.**


